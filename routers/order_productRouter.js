const express = require("express");
const order_productRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const order_productController = require("./../controllers/order_productController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
order_productRouter.get("/order1", order_productController.index);

//rotta destroy
order_productRouter.delete("/order1/:id", order_productController.destroy);

module.exports = order_productRouter;
