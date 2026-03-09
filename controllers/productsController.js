//importo connsessione DB
const connection = require("./../data/db");

//definisco funzioni CRUD
function index(req, res) {
  res.send("<h1>sono il controller index di products</h1>");
}

module.exports = { index };
