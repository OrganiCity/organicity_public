import { pool } from "../controller"
import { isProvided } from "../utils"

export function getStoreProducts(req, res) {
  if (!isProvided(req.body.userID)) return res.status(400).send("Bad request!")
  const queryText = `SELECT productID FROM products WHERE sellerID = ? `;
  const queryValues = [req.body.userID];
  pool.query(queryText, queryValues, (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}

export function deleteMyProduct(req, res) {
  if (!isProvided(req.body.productID)) return res.status(400).send("Bad request!")
  const queryText = `DELETE FROM organicity.products
	                    WHERE productID = ?`;
  const queryValues = [req.body.productID];
  pool.query(queryText, queryValues, (err, data) => {
    console.log(req.body.productID)
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}

export function getCertificates(req, res) {

  const queryText = `SELECT c.cID, c.cName 
                     FROM certificates c `;
  pool.query(queryText, (err, data) => {
    console.log(req.body.productID)
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}