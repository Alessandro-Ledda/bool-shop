const express = require("express");
const productsRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const productsController = require("./../controllers/productsController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
productsRouter.get("/", productsController.index);

module.exports = productsRouter;
