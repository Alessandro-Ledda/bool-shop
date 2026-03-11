const express = require("express");
const emailRouter = express.Router();

const emailController = require("./../controllers/emailController");

//--------------------DEFINIZIONE ROTTE---------------------

//rotta di index
emailRouter.post("/", emailController.store);

module.exports = emailRouter;
