import { pool } from "../controller"
import { isProvided } from "../utils"

export function getOrderPreviewsByID(req, res) {
    const id = req.params.id
    if (!isProvided(id)) return res.status(400).send("Id not defined")
    const queryText = `SELECT o.orderNumber, pi2.imgURL, o.shippingStatus, o.orderDate, (o.pricePerUnit*o.quantity) AS productTotal 
                        FROM orders o,  productImages pi2 
                        WHERE  o.buyerID = ?  AND  o.productID = pi2.productID 
                        GROUP BY o.orderNumber, o.productID `

    pool.query(queryText, [id], (err, data) => {
        if (err) return res.status(500).send(err)
        const order = {}
        const isArrived = true
        data.forEach(e => {
            const current = order[e.orderNumber]
            if(current){ // If exists
                current.imgURLs.push(e.imgURL)
                current.orderTotal += e.productTotal
                if(e.shippingStatus != "arrived") current.status = false
            }
            else{
                order[e.orderNumber] = {}
                order[e.orderNumber].imgURLs = [e.imgURL]
                order[e.orderNumber].orderTotal = e.productTotal
                order[e.orderNumber].orderDate = e.orderDate
                if(e.shippingStatus == "arrived") order[e.orderNumber].status = true;
                else order[e.orderNumber].status = false
                
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
                        GROUP BY p.productID `;
    pool.query(queryText, [id], (err, data) => {
        if (err) return res.status(500).send(err)
        const order = {}
        const products = {}
        data.forEach(e => {
            const current = order[e.sellerID]
            if(current){ // If exists
                current.products[e.productID] = {}
                current.products[e.productID].name = e.productName
                current.products[e.productID].price = e.pricePerUnit
                current.products[e.productID].quantity = e.quantity
                current.products[e.productID].imgURL = e.imgURL
                if(e.shippingStatus != "arrived") current.status = false
            }
            else{
                order[e.sellerID] = {}
                order[e.sellerID].companyName = e.companyName
                order[e.sellerID].products = {}
                order[e.sellerID].products[e.productID] = {}
                order[e.sellerID].products[e.productID].name = e.productName
                order[e.sellerID].products[e.productID].price = e.pricePerUnit
                order[e.sellerID].products[e.productID].quantity = e.quantity
                order[e.sellerID].products[e.productID].imgURL = e.imgURL
                if(e.shippingStatus == "arrived") order[e.sellerID].status = true;
                else order[e.sellerID].status = false
           
            }
        });
        return res.status(200).send(order);
    })
}

export function createNewOrder(req, res){
    if (!isProvided(req.body.items, req.body.deliveryAddress, req.body.billingAddress, req.body.userID, req.body.fastShipment))
        return res.status(400).send();
    
    pool.query("SELECT MAX(orderNumber) as maxOrderNumber FROM orders;", [], (err, data) => {
        let orderNumber = data[0]?.maxOrderNumber + 1;
        let pIDs = Object.keys(req.body.items)
        pool.query("SELECT productID, pricePerUnit FROM products WHERE productID IN (?) ", [pIDs], (err, data) => {
            const queryText = `INSERT INTO orders
            (productID, fastShipment, buyerID, orderNumber, quantity, pricePerUnit) VALUES ` + "(?,?,?,?,?,?), ".repeat(Object.keys(req.body.items).length - 1) + "(?,?,?,?,?,?);"
            const queryValues = Object.keys(req.body.items).reduce(function (r, v) {r.push(Number.parseInt(v), req.body.fastShipment, req.body.userID, orderNumber, req.body.items[v], data.filter(e=>e.productID==v)[0].pricePerUnit); return r;}, []);
            
            pool.query(queryText, queryValues, (err, data) => {
                const deliveryAddress =  req.body.deliveryAddress.ZIPorNeighbourhood + " " + req.body.deliveryAddress.street + " Bina ve Daire No:" +  req.body.deliveryAddress.buildingAndFlatNo + " " + req.body.deliveryAddress.district + " " + req.body.deliveryAddress.city + "/" + req.body.deliveryAddress.country;
                const billingAddress =  req.body.billingAddress.ZIPorNeighbourhood + " " + req.body.billingAddress.street + " Bina ve Daire No:" +  req.body.billingAddress.buildingAndFlatNo + " " + req.body.billingAddress.district + " " + req.body.billingAddress.city + "/" + req.body.billingAddress.country;
                pool.query('INSERT INTO orderData (orderNumber, deliveryAddress, billingAddress) VALUES (?, ?, ?)', [orderNumber, deliveryAddress, billingAddress], (err, data) => {
                    if(err) return res.status(500).send()
                    return res.status(200).send();
                })
            })
        })
    })
    let ppu = 10;

    

}