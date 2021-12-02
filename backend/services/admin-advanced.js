import { pool } from "../controller"
import { isProvided } from "../utils"

export function getUsers(req, res) {
    pool.query("select * from users", (err, data) => {
        if (err) return res.status(500).send(err)
        res.status(200)
        res.json(data)
    })
}

export function deleteUser(req, res) {
    const id = req.params.id
    if (!isProvided(id) || !Number.isInteger(Number.parseInt(id))) return res.status(400).send("No user id provided")
    pool.query("delete from users where userID = ?", [id], (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send("User Deleted")
    })
}

export function getSellers(req, res) {
    pool.query("select * from sellers", (err, data) => {
        if (err) return res.status(500).send(err)
        res.status(200)
        res.json(data)
    })
}

export function deleteSeller(req, res) {
    const id = req.params.id
    if (!isProvided(id) || !Number.isInteger(Number.parseInt(id))) return res.status(400).send("No seller id provided")
    pool.query("delete from sellers where sellerID = ?", [id], (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send("Seller Deleted")
    })
}

export function getOrders(req, res) {
    pool.query(`select o.orderID ,p.productID,p.productName ,sh.shipperCompanyName ,o.orderNumber ,o.quantity ,companyName,p.pricePerUnit,o.shippingStatus from 
                sellers s join
                orders o join
                shippers sh join
                products p WHERE o.productID =p.productID and p.sellerID =s.sellerID and sh.shipperID =o.shipperID`,
        (err, data) => {
            if (err) return res.status(500).send(err)
            res.status(200)
            res.json(data)
        })
}

export function deleteOrder(req, res) {
    const id = req.params.id
    if (!isProvided(id) || !Number.isInteger(Number.parseInt(id))) return res.status(400).send("No order id provided")
    pool.query("delete from orders where orderID = ?", [id], (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send("Order Deleted")
    })
}

export function getShippers(req, res) {
    pool.query(`select * from shippers`,
        (err, data) => {
            if (err) return res.status(500).send(err)
            res.status(200)
            res.json(data)
        })
}

export function deleteShipper(req, res) {
    const id = req.params.id
    if (!isProvided(id) || !Number.isInteger(Number.parseInt(id))) return res.status(400).send("No shipper id provided")
    pool.query("delete from shippers where shipperID = ?", [id], (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send("Shipper Deleted")
    })
}

export function addShipper(req, res) {
    const shipperCompanyName = req.body.shipperCompanyName
    const contactNumber = req.body.contactNumber
    const shipperURL = req.body.shipperURL
    if (!isProvided(shipperCompanyName, contactNumber, shipperURL)) return res.status(400).send("Please provide required info")
    pool.query(`INSERT INTO organicity.shippers
    (shipperCompanyName, contactNumber, shipperURL)
    VALUES(?, ?, ?)`, [shipperCompanyName, contactNumber, shipperURL], (err, data) => {
        if(err) return res.status(500).send(err)
        return res.status(200).send("Shipper Added")
    })
}