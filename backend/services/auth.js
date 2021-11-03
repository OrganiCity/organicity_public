import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"
const secrets = require("../secrets.json")
import { pool } from "../controller"

export function registerUser(req, res) {
    let username = req.body.username
    let hashedPassword = bcrypt.hashSync(req.body.password, 8)
    let name = req.body.name
    let phone = req.body.phone
}