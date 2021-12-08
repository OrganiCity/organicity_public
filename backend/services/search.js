import e from "express"
import { pool } from "../controller"
import { isProvided } from "../utils"

export function getSearchResults(req, res) {
    const q = req.query.q
    const cat = req.query.cat
    const seller = req.query.seller
    const minPrice = req.query.minPrice
    const maxPrice = req.query.maxPrice

    const sqlQueries = {
        none: "SELECT p.productID FROM products p WHERE 1=1",
        byQ: " AND p.productName LIKE CONCAT('%', ?,  '%')",
        byCat: " AND p.categoryID = ?",
        bySeller: " AND p.sellerID = ?",
        byMinPrice: " AND p.pricePerUnit > ?",
        byMaxPrice: " AND p.pricePerUnit < ?"
    }

    let sqlText = sqlQueries.none
    let sqlVars = []
    if (isProvided(q)) {
        sqlText += sqlQueries.byQ
        sqlVars.push(q)
    }
    if (isProvided(cat) && Number.isInteger(cat)) {
        sqlText += sqlQueries.byCat
        sqlVars.push(cat)
    }
    if (isProvided(seller) && Number.isInteger(minPrice)) {
        sqlText += sqlQueries.bySeller
        sqlVars.push(seller)
    }
    if (isProvided(minPrice) && !Number.isNaN(minPrice)) {
        sqlText += sqlQueries.byMinPrice
        sqlVars.push(Number.parseFloat(minPrice))
    }
    if (isProvided(maxPrice) && !Number.isNaN(maxPrice)) {
        sqlText += sqlQueries.byMaxPrice
        sqlVars.push(Number.parseFloat(maxPrice))
    }
    pool.query(sqlText, sqlVars, (err, data, asd) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(data.map(e => e.productID))
    })

}