//importo connsessione DB
const connection = require("./../data/db");

// //importo middlewere per verifica coupon
// const verifyCoupon = require("./../middlewares/verifyCoupon");

//definisco funzioni CRUD
function index(req, res) {
  //definisco query sql
  const sql = `SELECT *
                 FROM orders`;

  //eseguo richiesta al DB
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    res.json(results);
  });
}

//creo funzione store per creare nuova reviews
function update(req, res) {
  //recupero body da req
  const {
    customer_first_name,
    customer_last_name,
    customer_city,
    customer_cap,
    customer_email,
    customer_phone,
    customer_address,
    coupon_code,
  } = req.body;

  //definisco query da fare al db
  const sqlUpdateOreders = `UPDATE orders
              SET 
              customer_first_name = ?,
               customer_last_name = ?, 
               customer_city = ?, 
               customer_cap = ?, 
               customer_email = ?, 
               customer_phone = ?,
               customer_address = ?, 
               order_date = NOW(), 
               coupon_percentage = ?, 
               total = 10
              WHERE id = 1`;

  //recuopero data attuale per verificare che nel momento in cui viene inserito il coupon sia valido
  const dataCorrente = new Date();

  //definisco query sql
  const sqlCoupons = `SELECT *
                 FROM coupons`;

  //eseguo richiesta al DB
  connection.query(sqlCoupons, (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    const obj_coupon = results.find((coupon) => coupon.code === coupon_code);

    //verifico se il codice esiste nei coupons e quindi se l'oggetto coupon recuperato col find non sia vuoto
    if (!obj_coupon) {
      //se l'oggetto è vuoto mando messaggio di coupon non valido
      coupon_percentage = undefined;
    }
    //se quindi il codice coupon è valido vado avanti con la verifica della data
    //se la data corrente è compresa tra le date di validazione coupon mando oggetto con codice accettato e le varie poprietà
    else if (
      dataCorrente >= obj_coupon.start_date &&
      dataCorrente <= obj_coupon.end_date
    ) {
      coupon_percentage = parseInt(obj_coupon.coupon_percentage);
      console.log(obj_coupon.coupon_percentage);
    } else {
      coupon_percentage = undefined;
    }

    //eseguo query db
    connection.query(
      sqlUpdateOreders,
      [
        customer_first_name,
        customer_last_name,
        customer_city,
        customer_cap,
        customer_email,
        customer_phone,
        customer_address,
        coupon_percentage,
      ],
      (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.send("ok");
      },
    );
  });
}

module.exports = { index, update };
