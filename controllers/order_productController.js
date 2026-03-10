//importo connsessione DB
const connection = require("./../data/db");

//DEFINIZIONE CRUD

//INDEX per recuperare lista ordini
function index(req, res) {
  //definisco query sql
  const sql = `SELECT *
                 FROM order_product
                 WHERE order_id = 1`;

  //eseguo richiesta al DB
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    res.json(results);
  });
}

module.exports = { index };
