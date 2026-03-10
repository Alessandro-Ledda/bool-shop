const express = require("express");
const order_productRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const order_productController = require("./../controllers/order_productController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
order_productRouter.get("/order1", order_productController.index);

//rotta store
order_productRouter.post("/order1", order_productController.store);

//rotta modify
order_productRouter.patch(
  "/order1/:product_id",
  order_productController.modify,
);

//rotta destroy
order_productRouter.delete(
  "/order1/:product_id",
  order_productController.destroy,
);

module.exports = order_productRouter;
