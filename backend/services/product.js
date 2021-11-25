import { pool } from "../controller"
import { isProvided } from "../utils"

export function getProductByID(req, res) {
    const id = req.params.id
    if (!isProvided(id)) return res.status(400).send("Id not defined")
    pool.query(
        `select p.*,s.companyName from products p, sellers s where p.productID = ?`,
        [id],
        (err, data) => {
            if (err) return res.status(500).send(err)
            else if (!data.length) return res.status(404).send("No product found with this id")
            pool.query(`select imgURL from productImages where productID = ?`, [id], (err, imageData) => {
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
                        data.breadcrumbs.unshift({categoryID: 0,
                                                  name: "Anasayfa"})
                        res.status(200).send(data)
                    })

            })

        })
}

