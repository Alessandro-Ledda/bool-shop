const express = require("express");
const order_productRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const order_productController = require("./../controllers/order_productController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
order_productRouter.get("/order", order_productController.index);

//rotta store
order_productRouter.post("/order", order_productController.store);

//rotta modify
order_productRouter.patch("/order/:product_id", order_productController.modify);

//rotta destroy
order_productRouter.delete(
  "/order/:product_id",
  order_productController.destroy,
);

module.exports = order_productRouter;
