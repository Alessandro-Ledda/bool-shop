//importo connsessione DB
const connection = require("./../data/db");

//DEFINIZIONE CRUD

//INDEX per recuperare lista prodotti nell'ordine 1
function index(req, res) {
  //definisco query sql
  const sql = `SELECT product_id,name,price,discount_percentage,unit_price,unit_quantity,image
               FROM order_product
               JOIN products ON order_product.product_id = products.id
               WHERE order_id = 1`;

  //eseguo richiesta al DB
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    res.json(results);
  });
}

//STORE per inserire un nuovo prodotto nell'ordine
function store(req, res) {
  //prendo i dati in ingresso
  const { product_id, unit_quantity } = req.body;

  //-----------------RECUPERO DA DB PREZZO E SCONTO DEL PRODOTTO------------------------
  const sqlProduct = `SELECT price, discount_percentage
                      FROM products
                      WHERE id = ?`;

  //eseguo query al DB
  connection.query(sqlProduct, [product_id], (err, results) => {
    //definisco product price come intero per utlizzarlo nelle operazioni di verifica
    const product_price = parseInt(results[0].price);
    const discount_percentage = parseInt(results[0].discount_percentage);

    //definisco il prezzo finale per il singolo prodotto
    let unit_price = product_price;

    //se esiste il valore discount percentage, e quindi il prodotto è in promozione allora definisco il totate scontato
    discount_percentage &&
      (unit_price =
        product_price - product_price * (discount_percentage / 100));

    //definisco sql per andare a crearmi la nuova riga nell'ordine 1 con il nuovo prodotto
    const sql = `INSERT INTO order_product (product_id, order_id, unit_quantity, unit_price)
                VALUES (?, 1, ?, ?)`;

    //eseguo richiesta al DB
    connection.query(
      sql,
      [product_id, unit_quantity, unit_price],
      (err, results) => {
        if (err) return res.status(500).json({ error: "database not found" });

        res.sendStatus(201);
      },
    );
  });
}

//MODIFY per andare a modificare la quantita di un prodotto nell'ordine
function modify(req, res) {
  //recupero id del prodotto in cui andare a modificare la quantità nell'ordine
  const product_id = parseInt(req.params.product_id);

  //recupero quantità aggiornata da oggetto body
  const { unit_quantity } = req.body;

  //definisco sql per andare a crearmi la nuova riga nell'ordine 1 con il nuovo prodotto
  const sql = `UPDATE order_product
               SET unit_quantity = ?
               WHERE product_id = ? AND order_id = 1`;

  //eseguo richiesta al DB
  connection.query(
    sql,
    [parseInt(unit_quantity), product_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: "database not found" });

      res.sendStatus(201);
    },
  );
}

// //DESTROY per eliminare uno o tutti i prodotti
function destroy(req, res) {
  // recupero id dell'elemento da eliminare
  const product_id = parseInt(req.params.product_id);

  // definisco query aggiuntiva se arriva l'id
  // se viene passa 0 cone params allora elimino tutto altrimenti solo il prodotto con l'id passato
  const queryDelProduct_id = product_id === 0 ? "" : `AND product_id = ?`;

  // query SQL
  const sql = `
    DELETE FROM order_product
    WHERE order_id = 1
    ${queryDelProduct_id}
  `;

  // eseguo richiesta al DB
  connection.query(sql, [product_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    res.sendStatus(204);
  });
}

module.exports = { index, destroy, store, modify };
