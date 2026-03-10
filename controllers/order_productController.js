//importo connsessione DB
const connection = require("./../data/db");

//DEFINIZIONE CRUD

//INDEX per recuperare lista prodotti nell'ordine 1
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

// //DESTROY per eliminare uno o tutti i prodotti
// function destroy(req, res) {
//   //recupero id dell'elemento che voglio andare ad eliminare
//   const id = parseInt(req.params);

//   //definisco queryDelProduct_id se mi arriva il valore id del prodotto specifico da eliminare
//   const queryDelProduct_id = id ? `AND product_id = ${id}` : "";

//   //definisco queri sql
//   const sql = `DELETE FROM order_product
//                WHERE order_id = 1
//                ${queryDelProduct_id}`;

//   //eseguo richiesta al DB
//   connection.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: "Database query failed" });

//     res.sendStatus(204);
//   });
// }

function destroy(req, res) {
  // recupero id dell'elemento da eliminare
  const id = parseInt(req.params.id);

  // definisco query aggiuntiva se arriva l'id
  const queryDelProduct_id = id === 0 ? "" : `AND product_id = ${id}`;

  // query SQL
  const sql = `
    DELETE FROM order_product
    WHERE order_id = 1
    ${queryDelProduct_id}
  `;

  // eseguo richiesta al DB
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    res.sendStatus(204);
  });
}

module.exports = { index, destroy };
