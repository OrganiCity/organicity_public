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
        if (err) return res.status(500).send(err)
        const order = {}
        data.forEach(e => {
            const current = order[e.orderNumber]
            if(current){ // If exists
                current.imgURLs.push(e.imgURL)
                current.orderTotal += e.productTotal
                current.products.push(e.productID)
                current.status.push(e.shippingStatus)
            }
            else{
                order[e.orderNumber] = {}
                order[e.orderNumber].imgURLs = [e.imgURL]
                order[e.orderNumber].orderTotal = e.productTotal
                order[e.orderNumber].products = [e.productID]
                order[e.orderNumber].status = [e.shippingStatus]
                order[e.orderNumber].orderDate = e.orderDate
            }
        });
        return res.status(200).send(order);
    })
}

export function getOrderDetailsByOrderNumber(req, res){
    const id = req.params.id
    if (!isProvided(id)) return res.status(400).send("Id not defined")
    const queryText = `SELECT s.sellerID, s.companyName,  p.productID, p.productName, o.pricePerUnit, o.quantity, o.shippingStatus, pi2.imgURL as imgURL 
                        FROM orders o, products p, sellers s, productImages pi2 
                        WHERE  o.orderNumber = ? AND o.productID = p.productID  AND p.sellerID = s.sellerID  AND pi2.productID = o.productID 
                        GROUP BY p.productID 
     `;
    pool.query(queryText, [id], (err, data) => {
        if (err) return res.status(500).send(err)
        const order = {}
        data.forEach(e => {
            const current = order[e.sellerID]
            if(current){ // If exists
                current.products.push(e.productID)
                current.names.push(e.productName)
                current.pricesPerUnit.push(e.pricePerUnit)
                current.quantities.push(e.quantity)
                current.imgURLs.push(e.imgURL)
                current.status.push(e.shippingStatus)
            }
            else{
                order[e.sellerID] = {}
                order[e.sellerID].companyName = e.companyName
                order[e.sellerID].products = [e.productID]
                order[e.sellerID].names = [e.productName]
                order[e.sellerID].pricesPerUnit = [e.pricePerUnit]
                order[e.sellerID].quantities = [e.quantity]
                order[e.sellerID].imgURLs = [e.imgURL]
                order[e.sellerID].status = [e.shippingStatus]
           
            }
        });
        return res.status(200).send(order);
    })
}