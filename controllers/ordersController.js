//importo connsessione DB
const connection = require("./../data/db");

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
    coupons,
  } = req.body;

  //definisco query da fare al db
  const sql = `UPDATE orders
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

  //eseguo query db
  connection.query(
    sql,
    [
      customer_first_name,
      customer_last_name,
      customer_city,
      customer_cap,
      customer_email,
      customer_phone,
      customer_address,
    ],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      console.log(req.coupon_percentage);

      res.send("ok");
    },
  );
}

module.exports = { index, update };
