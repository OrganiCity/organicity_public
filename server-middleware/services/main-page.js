import { pool } from "../controller"

export function getFeatured(req, res) {
    pool.query("select * from users", (err, data) => {
        if (err) throw err
        res.status(200)
        res.json(data)
    })
}