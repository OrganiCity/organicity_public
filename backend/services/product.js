import { pool } from "../controller"
import { isProvided } from "../utils"

export function getProductByID(req, res) {
    const id = req.params.id
    if (!isProvided(id)) return res.status(400).send("Id not defined")
    pool.query(
        `SELECT p.*,s.companyName FROM products p, sellers s WHERE p.productID = ?  AND s.sellerID = p.sellerID`,
        [id],
        (err, data) => {
            if (err) return res.status(500).send(err)
            else if (!data.length) return res.status(404).send("No product found with this id")
            pool.query(`SELECT imgURL from productImages WHERE productID = ?`, [id], (err, imageData) => {
                if (err) return res.status(500).send(err)
                else if (!imageData.length) return res.status(404).send(err)
                data = data[0]
                data.images = imageData.map(e => e.imgURL)

                pool.query(
                    `SELECT parent.categoryID, parent.name
                    FROM products p, 
                        nested_category node,
                        nested_category parent
                    WHERE node.lft BETWEEN parent.lft AND parent.rgt
                          AND node.categoryID = p.categoryID AND p.productID = ?`,
                    [id],
                    (err, breadcrumbData) => {
                        if (err) return res.status(500).send(err)
                        data.breadcrumbs = breadcrumbData
                        breadcrumbData.shift()
                        data.breadcrumbs.unshift({
                            categoryID: 0,
                            name: "Anasayfa"
                        })

                        pool.query(
                            `
                            SELECT c.cName, c.description, c.iconTag 
                            FROM productCertificates pc, sellerCertificates sc, products p, certificates c 
                            WHERE pc.productID = ? AND pc.productID = p.productID AND p.sellerID = sc.sellerID 
                            AND sc.cID = pc.cID AND sc.cID = c.cID AND sc.approved = 1 
                        `, [id], (err, cData) => {
                            if (err) return res.status(500).send(err)
                            data.certificates = cData
                            return res.status(200).send(data)
                        })

                    })
            })
        })
}

export function isFavorited(req, res) {
    if (!isProvided(req.body.productID, req.body.userID)) return res.status(400).send("Id not defined")

    pool.query(`SELECT 1 as favorited
                FROM favorites f
                WHERE f.productID= ? and f.userID = ?`, [req.body.productID, req.body.userID], (err, data) => {
        if (err) return res.status(500).send("Internal Server Error");
        if (data.length) data = data[0];
        return res.status(200).send(data)
    })

}

export function getCartProductsByID(req, res) {
    const ids = req.query.ids.map((e) => Number.parseInt(e))
    if (!isProvided(ids)) return res.status(400).send("Id not defined")
    pool.query(
        `SELECT p.productName,p.productID,p.pricePerUnit,s.companyName from products p, sellers s 
        WHERE p.productID in (?) and p.sellerID = s.sellerID 
        ORDER BY productID`,
        [ids],
        (err, data) => {
            if (err) return res.status(500).send(err)
            else if (!data.length) return res.status(404).send("No product found with this id")
            pool.query(`SELECT min(imgURL) as imgURL FROM productImages WHERE productID in (?) GROUP BY productID`, [ids], (err, imageData) => {
                if (err) return res.status(500).send(err)
                else if (!imageData.length) return res.status(404).send(err)
                data.map((e, i) => e.image = imageData[i].imgURL)
                return res.status(200).send(data)
            })
        })
}

export function addToFavorites(req, res) {
    if (!isProvided(req.body.productID, req.body.userID)) return res.status(400).send("Id not defined")
    pool.query(
        `INSERT INTO organicity.favorites (userID,productID)
        VALUES (?, ?);
        `,
        [req.body.userID, req.body.productID],
        (err) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send("OK")
        })
}




export function deleteFromFavorites(req, res) {
    if (!isProvided(req.body.productID, req.body.userID)) return res.status(400).send("Id not defined")
    pool.query(
        `DELETE FROM organicity.favorites
        WHERE userID=? AND productID=?;
            `,
        [req.body.userID, req.body.productID],
        (err) => {
            if (err) return res.status(500).send(err)
            return res.status(200).send("OK")
        })
}
