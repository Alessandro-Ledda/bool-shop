const express = require("express");
const ordersRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const ordersController = require("./../controllers/ordersController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
ordersRouter.get("/order", ordersController.show);

ordersRouter.post("/order", ordersController.store);

module.exports = ordersRouter;
