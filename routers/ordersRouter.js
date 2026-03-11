const express = require("express");
const ordersRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const ordersController = require("./../controllers/ordersController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
ordersRouter.get("/:order_id", ordersController.show);

ordersRouter.post("/", ordersController.store);

module.exports = ordersRouter;
