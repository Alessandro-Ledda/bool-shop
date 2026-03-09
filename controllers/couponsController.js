//importo connsessione DB
const connection = require("./../data/db");

//definisco funzioni CRUD
function index(req, res) {
  //recupero valore coupons che ci arriva nell'endpoint
  const coupon_code = req.query.coupon;

  //recuopero data attuale per verificare che nel momento in cui viene inserito il coupon sia valido
  const dataCorrente = new Date();

  //definisco query sql
  const sql = `SELECT *
                 FROM coupons`;

  //eseguo richiesta al DB
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "database not found" });

    const obj_coupon = results.find((coupon) => coupon.code === coupon_code);

    //verifico se il codice esiste nei coupons e quindi se l'oggetto coupon recuperato col find non sia vuoto
    if (!obj_coupon) {
      //se l'oggetto è vuoto mando messaggio di coupon non valido
      res.json({ message: "codice non esistente" });
    }
    //se quindi il cosice coupon è valido vado avanti con la verifica della data
    //se la data corrente è compresa tra le date di validazione coupon mando oggetto con codice accettato e le varie poprietà
    else if (
      dataCorrente >= obj_coupon.start_date &&
      dataCorrente <= obj_coupon.end_date
    ) {
      res.json({
        message: "codice valido",
        coupon_percentage: obj_coupon.coupon_percentage,
      });
    } else {
      res.json({
        message: `coupon scaduto il ${obj_coupon.end_date}`,
      });
    }
  });
}

module.exports = { index };
