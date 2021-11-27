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


export function addCarouselSlide(req, res) {
  //if(!checkAdmin(req.headers.authorization))
  //  return res.status(401).send("Failed to authanticate as admin.");
  let slideIdx = req.body.idx;

  const queryText = "UPDATE carouselSlides"
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

}