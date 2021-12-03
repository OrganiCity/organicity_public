import { pool } from "../controller"

export function getFeatured(req, res) {
    pool.query("select * from users", (err, data) => {
        if (err) throw err
        res.status(200)
        res.json(data)
    })
}

export function getCarouselSlides(req, res) {
    pool.query("select * from carouselSlides ORDER BY idx", (err, data) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.json(data)
    })
}

export function getMainPageItems(req, res) {
    pool.query("SELECT mpi.productID, mpi.listID, mpl.title FROM mainPageItems mpi JOIN mainPageLists mpl WHERE mpi.listID=mpl.listID", (err, data) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.json(data)
    })
}

export function getProductPreviewDetails(req, res) {
    let queryText = `SELECT p.productID, p.productName, p.pricePerUnit, s.companyName, min(imgURL) as imgURL
    FROM products p 
    LEFT JOIN sellers s ON p.sellerID = s.sellerID 
    LEFT JOIN productImages pi2 on pi2.productID=p.productID WHERE p.productID=?`

    pool.query(queryText, [req.body.productID], (err, data) => {
        if (err) return res.status(500).send("Internal Server Error");
        data = data[0];
        pool.query(` SELECT c.cName, c.description, c.iconTag 
        FROM productCertificates pc, sellerCertificates sc, products p, certificates c 
        WHERE pc.productID = ? AND pc.productID = p.productID AND p.sellerID = sc.sellerID 
        AND sc.cID = pc.cID AND sc.cID = c.cID AND sc.approved = 1 `, [req.body.productID], (err, cData) => {
            if (err) return res.status(500).send("Internal Server Error");
            data.certificates = cData;
            return res.status(200).send(data);

        })
    })
}

export function getSpecialDeals(req, res) {
    pool.query("SELECT p.productID, productName, pricePerUnit, src FROM products p JOIN (SELECT * FROM specialDeals) AS sd WHERE p.productID=sd.productID", (err, data) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.json(data)
    })
}

export function getCategories(req, res) {
    pool.query(`SELECT node.categoryID, node.name, (COUNT(parent.name) - (sub_tree.depth + 1)) AS depth, node.iconTag
    FROM nested_category AS node,
         nested_category AS parent,
         nested_category AS sub_parent,
         (
            SELECT node.name, (COUNT(parent.name) - 1) AS depth
            FROM nested_category AS node,
                 nested_category AS parent
            WHERE node.lft BETWEEN parent.lft AND parent.rgt
                 AND node.categoryID = 0
                 GROUP BY node.name
                 ORDER BY node.lft
          )AS sub_tree
    WHERE node.lft BETWEEN parent.lft AND parent.rgt
          AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt
          AND sub_parent.name = sub_tree.name
    GROUP BY node.name
    ORDER BY node.lft`,
        (err, list) => {
            list.shift()
            if (err) throw err
            var map = {}, node, roots = [], i, firstID, secondID;

            for (i = 0; i < list.length; i += 1) {
                map[list[i].categoryID] = i; // initialize the map
                list[i].children = []; // initialize the children
            }


            for (i = 0; i < list.length; i += 1) {
                node = list[i];
                if (node.depth == 2) {
                    secondID = node.categoryID
                    list[map[firstID]].children.push(node);
                }
                else if (node.depth == 3) {
                    list[map[secondID]].children.push(node);
                }

                else {
                    firstID = node.categoryID;
                    roots.push(node);
                }
            }

            res.status(200)
            res.json(roots)
        })
}
