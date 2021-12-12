import { pool } from "../controller"
import { isProvided } from "../utils"

export function getSearchResults(req, res) {
    const q = req.query.q
    const cat = Number.parseInt(req.query.cat)
    const seller = Number.parseInt(req.query.seller)
    const minPrice = Number.parseFloat(req.query.minPrice)
    const maxPrice = Number.parseFloat(req.query.maxPrice)

    const sqlQueries = {
        none: "SELECT p.productID FROM products p WHERE 1=1",
        byQ: " AND p.productName LIKE CONCAT('%', ?,  '%')",
        byCat: " AND p.categoryID in (?)",
        bySeller: " AND p.sellerID = ?",
        byMinPrice: " AND p.pricePerUnit > ?",
        byMaxPrice: " AND p.pricePerUnit < ?"
    }

    let filterCats = false
    let sqlText = sqlQueries.none
    let sqlVars = []
    if (isProvided(q)) {
        sqlText += sqlQueries.byQ
        sqlVars.push(q)
    }
    if (isProvided(cat) && !Number.isNaN(cat)) {
        filterCats = true
    }
    if (isProvided(seller) && !Number.isNaN(seller)) {
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
    if (!filterCats)
        pool.query(sqlText, sqlVars, (err, data) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(data.map(e => e.productID))
        })
    else pool.query(`SELECT node.name,node.categoryID , (COUNT(parent.name) - (sub_tree.depth + 1)) AS depth
    FROM nested_category AS node,
         nested_category AS parent,
         nested_category AS sub_parent,
         (
            SELECT node.name, (COUNT(parent.name) - 1) AS depth
            FROM nested_category AS node,
                 nested_category AS parent
            WHERE node.lft BETWEEN parent.lft AND parent.rgt
                 AND node.categoryID = ?
                 GROUP BY node.name
                 ORDER BY node.lft
          )AS sub_tree
    WHERE node.lft BETWEEN parent.lft AND parent.rgt
          AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt
          AND sub_parent.name = sub_tree.name
    GROUP BY node.name
    HAVING depth <= 3
    ORDER BY node.lft;`, [cat], (err, data) => {
        if (err) return res.status(500).send(err)
        let catArr = data.map(e=>e.categoryID)
        sqlText += sqlQueries.byCat
        sqlVars.push(catArr)
        pool.query(sqlText, sqlVars, (err, data) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send(data.map(e => e.productID))
        })
    })

}

export function getAllChildCategories(req, res) {
    const categoryID = req.params.id
    pool.query(`SELECT node.name,node.categoryID , (COUNT(parent.name) - (sub_tree.depth + 1)) AS depth
    FROM nested_category AS node,
         nested_category AS parent,
         nested_category AS sub_parent,
         (
            SELECT node.name, (COUNT(parent.name) - 1) AS depth
            FROM nested_category AS node,
                 nested_category AS parent
            WHERE node.lft BETWEEN parent.lft AND parent.rgt
                 AND node.categoryID = ?
                 GROUP BY node.name
                 ORDER BY node.lft
          )AS sub_tree
    WHERE node.lft BETWEEN parent.lft AND parent.rgt
          AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt
          AND sub_parent.name = sub_tree.name
    GROUP BY node.name
    HAVING depth <= 3
    ORDER BY node.lft;`, [categoryID || 0], (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(data)
    })
}