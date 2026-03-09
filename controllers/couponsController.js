//importo connsessione DB
const connection = require("./../data/db");

//definisco funzioni CRUD
function index(req, res) {
  //definisco query sql
  const sql = `SELECT *
                 FROM coupons`;

  //eseguo richiesta al DB
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    //se non ci sono errori torno risultato query DB
    const resObj = { n_coupons: results.length, coupons: results };
    res.json(resObj);
  });
}

module.exports = { index };
