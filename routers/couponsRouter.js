const express = require("express");
const couponsRouter = express.Router();

//------------------------------------IMPORTO CONTROLLER----------------------
const couponsController = require("./../controllers/couponsController");
//-------------------------------------DEFINIZIONE ROTTE----------------------

//rotta index
couponsRouter.get("/", couponsController.index);

module.exports = couponsRouter;
