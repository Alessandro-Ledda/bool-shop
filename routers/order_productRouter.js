const express = require("express");
const order_productRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const order_productController = require("./../controllers/order_productController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
order_productRouter.get("/order1", order_productController.index);

module.exports = order_productRouter;
