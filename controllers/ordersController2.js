//importo connsessione DB
const connection = require("./../data/db");

//creo nuovo ordine
function create(req, res) {
  const { customer_first_name, customer_last_name, products } = req.body;

  // calcolo totale ordine
  let total = 0;
  if (products && Array.isArray(products)) {
    total = products.reduce(
      (sum, p) => sum + (p.quantity || 1) * (p.price || 10),
      0,
    ); // prezzo di default 10
  }

  // nessun coupon applicato
  const coupon_percentage = 0;
  const total_with_discount = total;

  // restituisco risposta JSON
  res.status(201).json({
    order_id: Math.floor(Math.random() * 1000), // id fittizio
    customer_first_name,
    customer_last_name,
    products,
    coupon_code: null,
    coupon_percentage,
    total,
    total_with_discount,
  });
}

// recupero ordine specifico tramite id
function show(req, res) {
  const { id } = req.params;

  // ordine fittizio per test
  const fakeOrder = {
    order_id: Number(id),
    customer_first_name: "Mario",
    customer_last_name: "Rossi",
    products: [
      { product_id: 1, quantity: 2, price: 20 },
      { product_id: 2, quantity: 1, price: 15 },
    ],
    coupon_code: null,
    coupon_percentage: 0,
    total: 55,
    total_with_discount: 55,
  };

  res.status(200).json(fakeOrder);
}

module.exports = { show, create };
