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
    const queryValues = [req.body.phoneNumber, req.body.email, req.body.userID];

    pool.query("select userID from users where email = ? and userID != ? ", [req.body.email,req.body.userID], (err, data) => {
        if (err) return res.status(500).send("Internal Server Error")
        else if (data.length) return res.status(404).send("User already exists")
        else pool.query(queryText, queryValues, (err) => {
            if (err) return res.status(500).send("Internal Server Error")
            return res.status(200).send()
        })
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

export function newSeller(req, res) {
    let queryValues = [req.body.userID, req.body.companyName, req.body.taxNumber, req.body.companyCountry, req.body.companyCity, req.body.companyAddress, req.body.IBAN, req.body.bank, req.body.bankAccountOwnerName, req.body.bankAccountOwnerSurname];
    if (!isProvided(...queryValues)) return res.status(400).send("Invalid data!");
    const queryText = `INSERT INTO organicity.sellers
        (sellerID, companyName, taxNumber, companyCountry, companyCity, companyAddress, IBAN, bank, bankAccountOwnerName, bankAccountOwnerSurname) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    pool.query(queryText, queryValues, (err, data) => {
        if (err) return res.status(500).send("Internal Server Error")
        return res.status(200).send(data)
    });
}

export function getAddresses(req, res) {
    const queryValues = [req.body.userID, req.body.type];
    if (!isProvided(...queryValues)) return res.status(400).send("Invalid data!");
    const queryText = `SELECT * FROM addresses WHERE userID = ? AND addressType = ?`

    pool.query(queryText, queryValues, (err, data) => {
        if(err) console.log(err);
        if (err) return res.status(500).send("Internal Server Error")
        return res.status(200).send(data)
    });
}

export function removeAddress(req, res) {
    console.log(req.body)
    const queryValues = [req.body.ID];
    if (!isProvided(...queryValues)) return res.status(400).send("Invalid data!");
    const queryText = `DELETE FROM addresses WHERE ID = ?`


    pool.query(queryText, queryValues, (err, data)=>{
        return res.status(200).send();
    })
}

export function updateAddress(req, res) {
    
    const queryValues = [req.body.phoneNumber, req.body.country, req.body.city, req.body.description, req.body.district, req.body.ZIPorNeighbourhood, req.body.name, req.body.street, req.body.toName, req.body.toSurname, req.body.buildingAndFlatNo, req.body.ID];

    if (!isProvided(req.body.phoneNumber, req.body.country, req.body.city, req.body.description, req.body.name, req.body.toName, req.body.toSurname, req.body.ID)) return res.status(400).send("Invalid data!");
    
    
    const queryText = `UPDATE addresses
	    SET phoneNumber=?, country=?, city=?, description=?, district=?, ZIPorNeighbourhood=?, name=?, street=?, toName=?, toSurname=?, buildingAndFlatNo=?
	    WHERE ID=?;`


    pool.query(queryText, queryValues, (err, data)=>{
        if(err) console.log(err)
        if(err) res.status(500).send();
        return res.status(200).send();
    })
}

export function newAddress(req, res) {
    const queryValues = [req.body.userID, req.body.addressType, req.body.phoneNumber, req.body.country, req.body.city, req.body.description, req.body.district, req.body.ZIPorNeighbourhood, req.body.name, req.body.street, req.body.toName, req.body.toSurname, req.body.buildingAndFlatNo];
    console.log(queryValues)
    if (!isProvided(req.body.userID, req.body.addressType, req.body.phoneNumber, req.body.country, req.body.city, req.body.description, req.body.name, req.body.toName, req.body.toSurname)) return res.status(400).send("Invalid data!");
    const queryText = `INSERT INTO addresses
    (userID, addressType, phoneNumber, country, city, description, district, ZIPorNeighbourhood, name, street, toName, toSurname, buildingAndFlatNo)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);`


    pool.query(queryText, queryValues, (err, data)=>{
        if(err) return res.status(500).send();
        return res.status(200).send();
    })
}
