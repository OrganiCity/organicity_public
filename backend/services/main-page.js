import { pool } from "../controller"

export function getFeatured(req, res) {
    pool.query("select * from users", (err, data) => {
        if (err) throw err
        res.status(200)
        res.json(data)
    })
}

export function getCarouselSlides(req, res) {
    pool.query("select * from carouselSlides", (err, data) => {
        if(err) return res.status(500).send("Internal Server Error");
        console.log(data)
        res.json(data)
    })
}

export function getSpecialDeals(req, res) {
    pool.query("select * from getSpecialDeals ORDER BY idx", (err, data) => {
        if(err) return res.status(500).send("Internal Server Error");
        console.log(data)
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
