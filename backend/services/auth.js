import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"
var secrets = require('../secrets.json')
import { pool } from "../controller"

export function registerUser(req, res) {
    let email = req.body.email
    let hashedPassword = bcrypt.hashSync(req.body.password, 8)
    let firstName = req.body.firstName
    let lastName = req.body.lastName

    const queryText = `INSERT INTO users(firstName, lastName, email, hashedPassword) VALUES
     (
        ?,
        ?,
        ?,
        ?
    )`
    const queryValues = [firstName, lastName, email, hashedPassword]

    pool.query("select userID from users where email = ?", [email], (err, data) => {
        if (err) return res.status(500).send("Internal Server Error")
        else if (data.length) return res.status(404).send("User already exists")
        else pool.query(queryText, queryValues, (err, data) => {
            if (err) return res.status(500).send("Internal Server Error")
            res.json(data)
        })
    })
}

export function loginUser(req, res) {
    let email = req.body.email
    let password = req.body.password
    const queryText = "select * from users where email = ?"
    const queryValue = [email]
    pool.query(queryText, queryValue, (err, data) => {
        if (err) return res.status(500).send("Internal Server Error")
        else if (!data.length) return res.status(404).send('No user found.')
        const user = data[0]
        const passwordValid = password && bcrypt.compareSync(password, user.hashedPassword)
        if (!passwordValid) return res.status(401).send({ token: null });
        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            userID: user.userID,
            isAdmin: user.isAdmin
        },
            secrets.jwt_secret,
            {
                expiresIn: 86400 // 24 hours
            }
        )
        res.status(200).send(token)
    })

}

export function meUser(req, res) {
    var token = req.headers.authorization;
    if (!(token && token.split(' ')[0] == 'Bearer')) return res.status(401).send('No token provided.');
    token = token.split(' ')[1]
    jwt.verify(token, secrets.jwt_secret, function (err, decoded) {
        if (err) return res.status(401).send('Failed to authenticate token.');
        return res.status(200).send(decoded);
    });
}

export function refreshToken(req, res) {
    var token = req.headers.authorization;
    if (!(token && token.split(' ')[0] == 'Bearer')) return res.status(401).send('No token provided.');
    token = token.split(' ')[1]
    var userData;    
    jwt.verify(token, secrets.jwt_secret, function (err, decoded) {
        if (err) return res.status(401).send('Failed to authenticate token.');
        userData = decoded;
    });

    const queryText = "select * from users where email = ?"
    const queryValue = [userData.email]

    pool.query(queryText, queryValue, (err, data) => {
        if (err) return res.status(500).send("Internal Server Error")
        else if (!data.length) return res.status(404).send('No user found.')
        const user = data[0]
        const passwordValid = password && bcrypt.compareSync(password, user.hashedPassword)
        if (!passwordValid) return res.status(401).send({ token: null });
        const token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            userID: user.userID,
            isAdmin: user.isAdmin
        },
            secrets.jwt_secret,
            {
                expiresIn: 86400 // 24 hours
            }
        )
        res.status(200).send(token)
    })
}