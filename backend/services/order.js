import { pool } from "../controller"
import { isProvided } from "../utils"

export function getOrderPreviewsByID(req, res) {
    const id = req.params.id
    if (!isProvided(id)) return res.status(400).send("Id not defined")
    const queryText = `SELECT o.orderNumber, pi2.imgURL, o.shippingStatus, o.orderDate, o.productID,(o.pricePerUnit*o.quantity) AS productTotal 
                        FROM orders o,  productImages pi2 
                        WHERE  o.buyerID = ?  AND  o.productID = pi2.productID 
                        GROUP BY o.orderNumber, o.productID `

    pool.query(queryText, [id], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(data);
    })
    
}