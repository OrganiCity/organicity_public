import { pool } from "../controller";
import { isProvided } from "../utils";

export function placeOrder(req, res) {
    const userID = req.body.userID
    if (!isProvided(userID)) return res.status(400).send("Not provided required info")

    var token = req.headers.authorization;
    if (!(token && token.split(' ')[0] == 'Bearer')) return res.status(401).send('No token provided.');
    token = token.split(' ')[1]
    var userData;
    jwt.verify(token, secrets.jwt_secret, function (err, decoded) {
        if (err) return res.status(401).send('Failed to authenticate token.');
        userData = decoded;
    });


    pool.query(`INSERT INTO organicity.orders (productID,shipperID,buyerID,orderNumber,shippingStatus,quantity) 
    VALUES (3,2,6,12345,'preparing',7);`,
        [ ],
        (err, data) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send("Order Placed")
        })
}