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

module.exports = { index };
