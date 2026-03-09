//importo connsessione DB
const connection = require("./../data/db");

// //importo middlewere per verifica coupon
// const verifyCoupon = require("./../middlewares/verifyCoupon");

//definisco funzioni CRUD

//INDEX per recuperare lista ordini
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

//update per andare a caricare nell'ordine 1 i dati ricevuti dal from del frontend
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

  //QUERY FINALE PER CARICARE I DATI
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
               total = ?
              WHERE id = 1`;

  //------------------LOGICA PER VERIFICARE COUPON---------------------------

  //definisco query sql per prendere lista coupon
  const sqlCoupons = `SELECT *
                      FROM coupons`;

  //recuopero data attuale per verificare che nel momento in cui viene inserito il coupon sia valido
  const dataCorrente = new Date();

  //creo oggetto vuoto dove andare a salvare risposte di verifica
  let coupon = {};

  //eseguo prima query al DB per recuperare coupon ed eseguire verifica
  connection.query(sqlCoupons, (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    //se coupon-code non è una stringa vuota allora faccio le verifiche sul coupon, altrimenti mando un messaggio in cui dico coupon non inserito
    if (coupon_code === "") {
      coupon = {
        valid: false,
        message: "coupon non inserito",
        coupon_percentage: undefined,
      };
    } else {
      //recupero l'oggetto del coupon ricercato
      const obj_coupon = results.find((coupon) => coupon.code === coupon_code);

      //verifico se il codice esiste nei coupons e quindi se l'oggetto coupon recuperato col find non sia vuoto
      if (!obj_coupon) {
        //se l'oggetto è vuoto mando messaggio di coupon non valido
        coupon = {
          valid: false,
          message: "coupon non valido",
          coupon_percentage: undefined,
        };
      }
      //se quindi il codice coupon è valido vado avanti con la verifica della data
      //se la data corrente è compresa tra le date di validazione coupon mando oggetto con codice accettato e le varie poprietà
      else if (
        dataCorrente >= obj_coupon.start_date &&
        dataCorrente <= obj_coupon.end_date
      ) {
        coupon = {
          valid: true,
          message: "coupon valido",
          coupon_percentage: parseInt(obj_coupon.coupon_percentage),
        };
      } else {
        coupon = {
          valid: false,
          message: `coupon scaduto in data : ${obj_coupon.end_date.toLocaleDateString()}`,
          coupon_percentage: undefined,
        };
      }
    }
    //-------------------------LOGICA PER ESTRAPOLARE TOTALE---------------------------

    //definisco query sql per ottenere la somma dell'ordine ricercato
    const sqlTotal = `SELECT SUM(unit_quantity* unit_price) AS total_sum
                    FROM order_product
                    WHERE order_id = 1`;

    //eseguo query al DB per ottenere la somma relativo all'ordine
    connection.query(sqlTotal, (err, results) => {
      if (err) return res.status(500).json({ error: err });

      //recupero questo valore di somma da risposta DB
      const total_sum = results[0].total_sum;

      //creo variabile totale da andare a caricare come ordine totale, inizializzo come totale somma dei prodotti ricavata dal DB
      let total = total_sum;

      //se esiste il valore coupon percentage, e quindi precedentemente è stato inserito un coupon valido allora definisco il totate scontato
      coupon.coupon_percentage &&
        (total = total_sum - total_sum * (coupon.coupon_percentage / 100));

      //eseguo query finale per andare a caricare i dati nell'ordine
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
          coupon.coupon_percentage,
          total,
        ],
        (err, results) => {
          if (err) return res.status(500).json({ error: err });

          res.json({
            coupon_valid: coupon.valid,
            message_coupon: coupon.message,
            total_order: Number(total.toFixed(2)),
          });
        },
      );
    });
  });
}

module.exports = { index, update };
