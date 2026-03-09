const express = require("express");
const app = express();
const port = process.env.PORT;

// importiamo middleware cors
const cors = require("cors");

// import del router dei prodotti
const productsRouter = require("./routers/productsRouter.js");
const couponsRouter = require("./routers/couponsRouter.js");
const ordersRouter = require("./routers/ordersRouter.js");

// import del middelware di gestione errore interno 500
const errorsHandler = require("./middlewares/errorsHandler.js");

// import del middelware di gestione di rotta inesistente
const notFound = require("./middlewares/notFound");

// middleware per il CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// attivazione della cartella public per uso file statici
app.use(express.static("public"));

// registro il body-parser per "application/json"
app.use(express.json());

// rotta home APP
app.get("/api", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// rotte relative al router dei prodotti
app.use("/api/products", productsRouter);
app.use("/api/coupons", couponsRouter);
app.use("/api/orders", ordersRouter);

// registriamo middelware di gestione rotta inesistente
app.use(notFound);

// registriamo middelware di gestione err 500
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
