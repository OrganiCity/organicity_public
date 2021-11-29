import { pool } from "../controller"
import { isProvided } from "../utils";

export function updatePersonalInfo(req, res) {
    if (!isProvided(req.body.firstName, req.body.lastName, req.body.gender, req.body.userID))
        return res.status(400).send();
    const queryText = `
    UPDATE organicity.users
    SET 
    firstName= ?,
    lastName=?,
    gender= ?
    WHERE userID= ?;
    `;
    let queryValues = [req.body.firstName, req.body.lastName, req.body.gender, req.body.userID];

    pool.query(queryText, queryValues, (err, data) => {
        if (err) return res.status(500).send("Internal Server Error")
        return res.status(200).send()
    })
}


export function updateContactInfo(req, res) {
    if (!isProvided(req.body.phoneNumber, req.body.email, req.body.userID))
        return res.status(400).send();
    const queryText = `
            UPDATE organicity.users
	        SET 
                phoneNumber=? ,email= ?
	        WHERE userID= ?;
            `;
    let queryValues = [req.body.phoneNumber, req.body.email, req.body.userID];

    pool.query(queryText, queryValues, (err) => {
        if (err) return res.status(500).send("Internal Server Error")
        return res.status(200).send()
    })
}

export function getFavoriteProducts(req, res) {
    if (!isProvided(req.body.userID)) return res.status(400).send("Id not defined");
    pool.query(
        ` SELECT f.productID
        FROM favorites f
        WHERE f.userID = ?
        `,
        [req.body.userID], (err, data) => {
            if (err) return res.status(500).send("Internal Server Error")
            return res.status(200).send(data)
        }
    )
}