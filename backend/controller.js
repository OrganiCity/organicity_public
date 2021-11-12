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
    host: 'database-1.crxfrzrrelwp.eu-central-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Organicity!',
    database: 'organicity'
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