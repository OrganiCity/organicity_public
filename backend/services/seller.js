import { pool } from "../controller"
import { isProvided } from "../utils"

export function getStoreProducts(req, res) {
  if (!isProvided(req.body.userID)) return res.status(400).send("Bad request!")
  const queryText = `SELECT * FROM products WHERE sellerID = ? `;
  const queryValues = [req.body.userID];
  pool.query(queryText, queryValues, (err, data) => {
          if (err) return res.status(500).send(err)
          return res.status(200).send(data)
      })
}