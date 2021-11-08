// Module Imports
const express = require("express");
const app = express();
app.use(express.json());
var mysql = require('mysql');

// JS Imports
import { loginUser, meUser, registerUser } from "./services/auth";
import { getFeatured } from "./services/main-page";


// Database Pool
var pool = mysql.createPool({
    // connectionLimit: 10,
    host: 'sql11.freemysqlhosting.net',
    port: 3306,
    user: 'sql11443134',
    password: 'iXU8RS92ue',
    database: 'sql11443134'
});


// Endpoints
app.get("/featured", getFeatured)

/***********
----Auth----
************/

// Registration
app.post('/auth/register', registerUser)
// User Me
app.get('/auth/me', meUser)
// Login
app.post('/auth/login', loginUser)


export { pool }
export default app