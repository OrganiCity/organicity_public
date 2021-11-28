import { pool } from "../controller"
import { isProvided } from "../utils"

export function submitForm(req, res) {
  if(!isProvided(req.body.firstname,req.body.lastname,req.body.email,req.body.phone,req.body.topic,req.body.message))
    return res.status(400).send();
  const queryText = `INSERT INTO contactUsSubmissions(fname, lname, email, phone, topic, message) VALUES
  (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
    )`;
    let queryValues = [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.topic, req.body.message];
    
  pool.query(queryText, queryValues, (err, data) => {
    if (err) return res.status(500).send("Internal Server Error")
    return res.status(200).send()
  })
}