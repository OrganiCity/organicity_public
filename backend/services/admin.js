import { pool } from "../controller"

function checkAdmin(token) {
    if (!(token && token.split(' ')[0] == 'Bearer')) return false;
    token = token.split(' ')[1]
    jwt.verify(token, secrets.jwt_secret, function (err, decoded) {
        if (err || !decoded.isAdmin) return false;
        return true;
    });
}

export function addCarouselSlide(req, res) {
  //if(!checkAdmin(req.headers.authorization))
  //  return res.status(401).send("Failed to authanticate as admin.");
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
  //if(!checkAdmin(req.headers.authorization))
  //  return res.status(401).send("Failed to authanticate as admin.");
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
  //if(!checkAdmin(req.headers.authorization))
  //  return res.status(401).send("Failed to authanticate as admin.");
  let itemIdx = req.body.idx;
  let itemID = req.body.productID;
  let itemImg = req.body.src;

  const queryText = "INSERT INTO specialDeals (idx, productID, src) VALUES (?, ?, ?);"
  const queryValues = [itemIdx, itemID, itemImg];
  pool.query(queryText, queryValues, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).send("Internal Server Error")
    }
    res.status(200).send()
  })
}

export function removeSpecialDeal(req, res) {
  //if(!checkAdmin(req.headers.authorization))
  //  return res.status(401).send("Failed to authanticate as admin.");
  let itemIdx = req.body.idx;

  let queryText = "DELETE FROM specialDeals WHERE idx=?;";
  let queryValues = [itemIdx];
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