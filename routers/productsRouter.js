const express = require("express");
const productsRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------

//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
productsRouter.get("/", (req, res) => res.send("<h1>index</h1>"));

//rotta index relativa a una specifica categoria
productsRouter.get("/category/:idCategory", productsController.indexCategory);

module.exports = productsRouter;
