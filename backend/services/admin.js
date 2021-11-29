import jwt from "jsonwebtoken"
var secrets = require('../secrets.json')
import { pool } from "../controller"

export function checkAdmin(req, res, next) {
  var token = req.headers.authorization;
  console.log(token);
  if (!(token && token.split(' ')[0] == 'Bearer')) return res.status(400).send("Invalid token!");
  token = token.split(' ')[1]
  jwt.verify(token, secrets.jwt_secret, function (err, decoded) {
    if (err || !decoded.isAdmin) return res.status(401).send("Not admin!");
    console.log("success")
    return next();
  });
}

export function addCarouselSlide(req, res) {
  let slideIdx = req.body.idx;
  let slideURL = req.body.route;
  let slideImg = req.body.src;

  const queryText = "INSERT INTO carouselSlides (idx, route, src) VALUES (?, ?, ?);"
  const queryValues = [slideIdx, slideURL, slideImg];
  pool.query(queryText, queryValues, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send("Internal Server Error")
    }
    res.status(200).send()
  })
}


export function removeCarouselSlide(req, res) {
  console.log("trying to remove");
  let slideIdx = req.body.idx;

  let queryText = "DELETE FROM carouselSlides WHERE idx=?;";
  let queryValues = [slideIdx];
  pool.query(queryText, queryValues, (err, data) => {
    if (err)
      return res.status(500).send("Internal Server Error")
    queryText = "UPDATE carouselSlides SET idx=idx-1 WHERE idx > ?;";
    pool.query(queryText, queryValues, (err, data) => {
      if (err)
        return res.status(500).send("Internal Server Error")
      res.status(200).send()
    })
  })
}


export function addSpecialDeal(req, res) {
  let itemIdx = req.body.idx;
  let itemID = req.body.productID;
  let itemImg = req.body.src;

  const queryText = "INSERT INTO specialDeals (idx, productID, src) VALUES (?, ?, ?);"
  const queryValues = [itemIdx, itemID, itemImg];
  console.log(queryValues);
  pool.query(queryText, queryValues, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send("Internal Server Error")
    }
    res.status(200).send()
  })
}

export function removeSpecialDeal(req, res) {
  let itemIdx = req.body.idx;

  let queryText = "DELETE FROM specialDeals WHERE idx=?;";
  let queryValues = [itemIdx];
  pool.query(queryText, queryValues, (err, data) => {
    if (err)
      return res.status(500).send("Internal Server Error")
    queryText = "UPDATE specialDeals SET idx=idx-1 WHERE idx > ?;";
    pool.query(queryText, queryValues, (err, data) => {
      if (err)
        return res.status(500).send("Internal Server Error")
      res.status(200).send()
    })
  })
}

// Categories
//  Add
export function addCategoryToTop(req, res) {
  let queryValues = [req.body.categoryName, req.body.iconTag];
  let queryText = `LOCK TABLE nested_category WRITE;
  
  SELECT @myLeft := lft FROM nested_category
  WHERE categoryID = 0;
  
  UPDATE nested_category SET rgt = rgt + 2 WHERE rgt > @myLeft;
  UPDATE nested_category SET lft = lft + 2 WHERE lft > @myLeft;
  
  INSERT INTO nested_category(name, lft, rgt, iconTag) VALUES(?, @myLeft + 1, @myLeft + 2, ?);
  
  UNLOCK TABLES;`;
  pool.query(queryText, queryValues, (err) => {
    if (err)
      return res.status(500).send("Internal Server Error")
    return res.status(200).send("Allah için OK")
  })
}
export function addCategoryBelow(req, res) {
  let queryValues = [req.body.upperCategoryName, req.body.categoryName, req.body.iconTag];
  let queryText = `  LOCK TABLE nested_category WRITE;

     SELECT @myRight := rgt FROM nested_category
      WHERE name = ?;

      UPDATE nested_category SET rgt = rgt + 2 WHERE rgt > @myRight;
      UPDATE nested_category SET lft = lft + 2 WHERE lft > @myRight;

      INSERT INTO nested_category(name, lft, rgt, iconTag) VALUES(?, @myRight + 1, @myRight + 2, ?);

      UNLOCK TABLES;`
  pool.query(queryText, queryValues, (err) => {
    if (err)
      return res.status(500).send("Internal Server Error")
    return res.status(200).send("Allah için OK")
  })
}
export function addSubCategory(req, res) {
  let queryValues = [req.body.parentCategoryName, req.body.categoryName, req.body.iconTag];
  let queryText = ` LOCK TABLE nested_category WRITE;
 
      SELECT @myLeft := lft FROM nested_category
      WHERE name = ?;

      UPDATE nested_category SET rgt = rgt + 2 WHERE rgt > @myLeft;
      UPDATE nested_category SET lft = lft + 2 WHERE lft > @myLeft;

      INSERT INTO nested_category(name, lft, rgt) VALUES(?, @myLeft + 1, @myLeft + 2);

      UNLOCK TABLES;`
  pool.query(queryText, queryValues, (err) => {
    if (err)
      return res.status(500).send("Internal Server Error")
    return res.status(200).send("Allah için OK")
  })


}
// Update & Delete
export function updateCategory(req, res) {
  let queryValues = [req.body.newCategoryName, req.body.oldCategoryName];
  let queryText = `
  UPDATE organicity.nested_category
	SET name= ? 
	WHERE name= ?;
  `
  pool.query(queryText, queryValues, (err) => {
    if (err)
      return res.status(500).send("Internal Server Error")
    return res.status(200).send("Allah için OK")
  })
}
export function deleteCategory(req, res) {
  let queryValues = [req.body.categoryName]
  console.log(queryValues)
  let queryText = `LOCK TABLE nested_category WRITE;

  SELECT @myLeft := lft, @myRight := rgt, @myWidth := rgt - lft + 1
  FROM nested_category
  WHERE name = ?;
  
  DELETE FROM nested_category WHERE lft BETWEEN @myLeft AND @myRight;
  
  UPDATE nested_category SET rgt = rgt - @myWidth WHERE rgt > @myRight;
  UPDATE nested_category SET lft = lft - @myWidth WHERE lft > @myRight;
  
  UNLOCK TABLES;`
  pool.query(queryText, queryValues, (err) => {
    if (err)
      return res.status(500).send("Internal Server Error")
    return res.status(200).send("Allah için OK")
  })
}