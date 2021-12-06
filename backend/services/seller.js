import util from "util"
import { pool } from "../controller"
import { isProvided } from "../utils"
var secrets = require('../secrets.json')
import jwt from "jsonwebtoken";

export function getStoreProducts(req, res) {
  if (!isProvided(req.body.userID)) return res.status(400).send("Bad request!")
  const queryText = `SELECT productID FROM products WHERE sellerID = ? `;
  const queryValues = [req.body.userID];
  pool.query(queryText, queryValues, (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}

export function addProductToStore(req, res) {
  const name = req.body.name
  const extraInfo = req.body.extraInfo
  const nutrValues = req.body.nutrValues
  const ingredients = req.body.ingredients
  const howToPreserve = req.body.howToPreserve
  const desc = req.body.desc
  const price = req.body.price
  const unitsInStock = req.body.unitsInStock
  const categoryID = req.body.categoryID
  const images = req.body.images
  const certificates = req.body.certificates
  if (!isProvided(name, categoryID, images, certificates, price, unitsInStock) || !images.length) return res.status(400).send("Required info not provided")
  var token = req.headers.authorization;
  if (!(token && token.split(' ')[0] == 'Bearer')) return res.status(401).send('No token provided.');
  token = token.split(' ')[1]
  var userData;
  jwt.verify(token, secrets.jwt_secret, function (err, decoded) {
    if (err) return res.status(401).send('Failed to authenticate token.');
    userData = decoded;
    if (!userData.isSeller) return res.status(401).send("Not a seller")
    pool.query(`INSERT INTO organicity.products (
      productName,
      sellerID,
      categoryID,
      pricePerUnit,
      unitsInStock,
      description,
      nutritionalValues,
      howToPreserve,
      ingredients,
      extraInfo)
    VALUES (?,?,?,?,?,?,?,?,?,?);`,
      [name, userData.userID, categoryID, price, unitsInStock, desc, nutrValues, howToPreserve, ingredients, extraInfo],
      (err, data) => {
        if (err) return res.status(500).send(err)
        const productID = data.insertId

        const queryPromise = util.promisify(pool.query).bind(pool);
        const queryPromises = []
        images.forEach(im => {
          queryPromises.push(
            queryPromise("INSERT INTO organicity.productImages (productID, imgURL) VALUES(?, ?)", [productID, im])
          )
        });
        certificates.forEach(cert => {
          queryPromises.push(
            queryPromise("INSERT INTO organicity.productCertificates (productID, cID) VALUES(?, ?)", [productID, cert])
          )
        })
        Promise.all(queryPromises)
          .then(() => {
            return res.status(200).send("Product Added to Store")
          }).catch((err) => {
            return res.status(500).send(err)
          })
      });
  });
}

export function deleteMyProduct(req, res) {
  if (!isProvided(req.body.productID)) return res.status(400).send("Product ID not provided!")
  const queryText = `DELETE FROM organicity.products
	                    WHERE productID = ?`;
  const queryValues = [req.body.productID];
  pool.query(queryText, queryValues, (err, data) => {
    console.log(req.body.productID)
    if (err) return res.status(500).send(err)
    return res.status(200).send(data)
  })
}

export function editProductOfStore(req, res) {
  const productID = req.body.productID
  const name = req.body.name
  const extraInfo = req.body.extraInfo
  const nutrValues = req.body.nutrValues
  const ingredients = req.body.ingredients
  const howToPreserve = req.body.howToPreserve
  const desc = req.body.desc
  const price = req.body.price
  const unitsInStock = req.body.unitsInStock
  const categoryID = req.body.categoryID
  const images = req.body.images
  const certificates = req.body.certificates
  if (!isProvided(productID, name, categoryID, images, certificates, price, unitsInStock) || !images.length) return res.status(400).send("Required info not provided")
  var token = req.headers.authorization;
  console.log(certificates)
  if (!(token && token.split(' ')[0] == 'Bearer')) return res.status(401).send('No token provided.');
  token = token.split(' ')[1]
  var userData;
  jwt.verify(token, secrets.jwt_secret, function (err, decoded) {
    if (err) return res.status(401).send('Failed to authenticate token.');
    userData = decoded;
    if (!userData.isSeller) return res.status(401).send("Not a seller")
    pool.query(`UPDATE organicity.products SET
      productName = ?,
      sellerID = ?,
      categoryID = ?,
      pricePerUnit = ?,
      unitsInStock = ?,
      description = ?,
      nutritionalValues = ?,
      howToPreserve = ?,
      ingredients = ?,
      extraInfo = ?
      WHERE productID = ?;`,
      [name, userData.userID, categoryID, price, unitsInStock, desc, nutrValues, howToPreserve, ingredients, extraInfo, productID],
      (err, data) => {
        if (err) return res.status(500).send(err)
        pool.query(
          `DELETE FROM organicity.productImages WHERE productID = ?;
           DELETE FROM organicity.productCertificates WHERE productID = ?
          `, [productID, productID], (err, data) => {
          if (err) return res.status(500).send(err)
          const queryPromise = util.promisify(pool.query).bind(pool);
          const queryPromises = []
          images.forEach(im => {
            queryPromises.push(
              queryPromise("INSERT INTO organicity.productImages (productID, imgURL) VALUES(?, ?)", [productID, im])
            )
          });
          certificates.forEach(cert => {
            queryPromises.push(
              queryPromise("INSERT INTO organicity.productCertificates (productID, cID) VALUES(?, ?)", [productID, cert])
            )
          })
          Promise.all(queryPromises)
            .then(() => {
              return res.status(200).send("Product Updated")
            }).catch((err) => {
              return res.status(500).send(err)
            })
        })
      });
  });
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


export function sendCertificateApprovalRequest(req, res) {
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


export function updateCertificateDocument(req, res) {
  const cID = req.body.cID
  const sellerID = req.body.sellerID
  const document = req.body.document
  if (!isProvided(cID, sellerID, document)) return res.status(400).send("Id not defined")
  const queryText = `UPDATE organicity.sellerCertificates
                     SET document = ?, approved='p'
                     WHERE cID = ? AND sellerID = ?`;

  pool.query(queryText, [document, cID, sellerID,], (err, data) => {
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