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
    if (err) return res.status(500).send(err)
    console.log("aa")
    return res.status(200).send(data)
  })
}

export function getCertificatesBySellerID(req, res) {
  const id = req.params.id
  if (!isProvided(id)) return res.status(400).send("Id not defined")
  const queryText = `SELECT sc.cID, c.cName, sc.approved, sc.document 
                     FROM sellerCertificates sc, certificates c
                     WHERE sc.cID = c.cID AND sc.sellerID = ? `;
  pool.query(queryText, [id], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}

export function getAvailableCertificatesBySellerID(req, res) {
  const id = req.params.id
  if (!isProvided(id)) return res.status(400).send("Id not defined")
  const queryText = `SELECT  c.cID, c.cName 
                     FROM certificates c 
                     WHERE c.cID NOT IN (SELECT sc.cID 
                                         FROM sellerCertificates sc 
                                         WHERE sc.sellerID = ? ) `;
  pool.query(queryText, [id], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}


export function sendCertificateApprovalRequest(req, res){
  const cID = req.body.cID;
  const sellerID = req.body.sellerID
  const document = req.body.document
  if (!isProvided(cID, sellerID, document)) return res.status(400).send("Id not defined")
  const queryText = `INSERT INTO organicity.sellerCertificates (cID,sellerID,approved,document)
	                      VALUES (? ,? ,'p', ?) `;
  pool.query(queryText, [cID, sellerID, document], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}

export function deleteCertificate(req, res) {
  const cID = req.body.cID
  const sellerID = req.body.sellerID
  if (!isProvided(cID, sellerID)) return res.status(400).send("Id not defined")
  const queryText = `DELETE FROM sellerCertificates
                      WHERE cID = ? AND sellerID = ?`;
  pool.query(queryText, [cID, sellerID], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}


export function updateCertificate(req, res) {
  const cID = req.body.cID
  const sellerID = req.body.sellerID
  const document = req.body.document
  if (!isProvided(cID, sellerID, document)) return res.status(400).send("Id not defined")
  const queryText = `UPDATE organicity.sellerCertificates
                     SET document = ?, approved='p'
                     WHERE cID = ? AND sellerID = ?`;

  pool.query(queryText, [document, cID, sellerID, ], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}



export function getStoreProductsByID(req, res) {
  const id = req.params.id
  if (!isProvided(id)) return res.status(400).send("Id not defined")
  pool.query(`SELECT s.companyName
              FROM sellers s
              WHERE s.sellerID = ?`, [id], (err, data) => {
    if (err) return res.status(500).send(err)
    data = data[0]
    pool.query(`SELECT p.productID 
                FROM products p 
                WHERE p.sellerID = ?`, [id],
      (err, pData) => {
        if (err) return res.status(500).send(err)
        else if (!pData.length) return res.status(404).send("No product found with this id")
        data.products = pData.map(e => e.productID)
        return res.status(200).send(data)
      })
  })
}