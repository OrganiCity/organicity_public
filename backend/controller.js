// Module Imports
const express = require("express");
const app = express();
app.use(express.json());
var mysql = require('mysql');


// JS Imports
import { loginUser, meUser, registerUser } from "./services/auth";
import { addCarouselSlide, removeCarouselSlide, addSpecialDeal, removeSpecialDeal, checkAdmin } from "./services/admin";
import { getCartProductsByID, getProductByID } from "./services/product";
import { getFeatured, getCarouselSlides, getSpecialDeals, getCategories, getMainPageItems, getProductPreviewDetails } from "./services/main-page";
import { submitForm } from "./services/contact-us";

// Database Pool
var pool = mysql.createPool({
    // connectionLimit: 10,
    host: 'database-1.crxfrzrrelwp.eu-central-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Organicity!',
    database: 'organicity',
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

/***********
----Admin----
************/
app.post('/admin/addCarouselSlide', checkAdmin, addCarouselSlide)
app.post('/admin/removeCarouselSlide', checkAdmin, removeCarouselSlide)

app.post('/admin/addSpecialDeal', checkAdmin, addSpecialDeal)
app.post('/admin/removeSpecialDeal', checkAdmin, removeSpecialDeal)
/***************
----Services----
****************/

app.post('/submitForm', submitForm)
app.get('/getMainPageItems', getMainPageItems)
app.post('/getProductPreviewDetails', getProductPreviewDetails)

// Get Product by ID
app.get('/services/product/:id', getProductByID)
app.get('/services/cart-product/', getCartProductsByID)
app.get('/categories', getCategories)

export { pool }
export default app