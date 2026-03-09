//importo connsessione DB
const connection = require("./../data/db");

//definisco funzioni CRUD
function index(req, res) {
  //recuper valore chiave order per vedere ordinamento
  const order = req.query.order;

  //dichiaro variabile che andrà a costituirmi la query di ordinamento nella richiesta DB
  let orderBy = "RAND()";

  //valuto questo valore
  order === "more_price" && (orderBy = "price DESC");
  order === "less_price" && (orderBy = "price");
  order === "latest_arrivals" && (orderBy = "created_date DESC");
  order === "first_arrivals" && (orderBy = "created_date");
  order === "name" && (orderBy = "name");

  //definisco query sql
  const sql = `SELECT *
                 FROM products
                 ORDER BY ${orderBy}`;

  //eseguo richiesta al DB
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    res.json(
      results.map((product) => {
        return {
          ...product,
          image_url: `${process.env.APP_URL}/${product.image}`,
        };
      }),
    );
  });
}

module.exports = { index };
