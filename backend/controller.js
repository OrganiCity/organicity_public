// Module Imports
const express = require("express");
const app = express();
app.use(express.json());
var mysql = require('mysql');


// JS Imports
import { loginUser, meUser, registerUser } from "./services/auth";
import { getFeatured, getCarouselSlides } from "./services/main-page";
import { getCategories } from "./services/main-page";
import { getProductByID } from "./services/product";


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
app.get("/getCarouselSlides", getCarouselSlides)
app.get("/getSpecialDeals", getSpecialDeals)

/***********
----Auth----
************/

// Registration
app.post('/auth/register', registerUser)
// User Me
app.get('/auth/me', meUser)
// Login
app.post('/auth/login', loginUser)

/***************
----Services----
****************/

// Get Product by ID
app.get('/services/product/:id', getProductByID)
app.get('/categories', getCategories)

export { pool }
export default app