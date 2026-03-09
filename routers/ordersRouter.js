const express = require("express");
const ordersRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const ordersController = require("./../controllers/ordersController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
ordersRouter.get("/", ordersController.index);

ordersRouter.post("/", ordersController.update);

module.exports = ordersRouter;
