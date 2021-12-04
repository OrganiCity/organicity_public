// Module Imports
const express = require("express");
const app = express();
app.use(express.json());
var mysql = require('mysql');


// JS Imports
import { loginUser, meUser, refreshToken, registerUser } from "./services/auth";
import { addCarouselSlide, removeCarouselSlide, addSpecialDeal, removeSpecialDeal, checkAdmin, addCategoryToTop, addCategoryBelow, addSubCategory, updateCategory, deleteCategory } from "./services/admin";
import { addToFavorites, deleteFromFavorites, getCartProductsByID, getProductByID, isFavorited } from "./services/product";
import { getCarouselSlides, getSpecialDeals, getCategories, getMainPageItems, getProductPreviewDetails } from "./services/main-page";
import { submitForm } from "./services/contact-us";
import { updatePersonalInfo, updateContactInfo, getFavoriteProducts, newSeller } from "./services/account";
import { deleteCertificate, deleteMyProduct, getAvailableCertificatesBySellerID, getCertificates, getCertificatesBySellerID, getStoreProducts, getStoreProductsByID, sendCertificateApprovalRequest, updateCertificateDocument } from "./services/seller";
import { addShipper, deleteOrder, deleteSeller, deleteShipper, deleteUser, getOrders, getSellerCertificates, getSellers, getShippers, getUsers, updateCertificateStatus } from "./services/admin-advanced";
import { getOrderPreviewsByID } from "./services/order";

// Database Pool
var pool = mysql.createPool({
    // connectionLimit: 10,
    host: 'database-1.crxfrzrrelwp.eu-central-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Organicity!',
    database: 'organicity',
    multipleStatements: true
});


// Endpoints
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

app.get('/auth/refresh-token', refreshToken)
// Refresh Token

/***********
----Admin----
************/
app.post('/admin/addCarouselSlide', checkAdmin, addCarouselSlide)
app.post('/admin/removeCarouselSlide', checkAdmin, removeCarouselSlide)

app.post('/admin/addSpecialDeal', checkAdmin, addSpecialDeal)
app.post('/admin/removeSpecialDeal', checkAdmin, removeSpecialDeal)

// Category
// Add
app.post('/admin/add-category-to-top', checkAdmin, addCategoryToTop)
app.post('/admin/add-category-below', checkAdmin, addCategoryBelow)
app.post('/admin/add-sub-category', checkAdmin, addSubCategory)

// Update & Delete
app.put('/admin/update-category', checkAdmin, updateCategory)
app.post('/admin/delete-category', checkAdmin, deleteCategory)

/*******************
----Admin Advanced---
********************/
app.get("/admin/users", getUsers)
app.delete("/admin/users/:id", deleteUser)
app.get("/admin/sellers", getSellers)
app.delete("/admin/sellers/:id", deleteSeller)
app.get("/admin/orders", getOrders)
app.delete("/admin/orders/:id", deleteOrder)
app.get("/admin/shippers", getShippers)
app.delete("/admin/shippers/:id", deleteShipper)
app.post("/admin/shippers", addShipper)
app.get("/admin/seller-certificates", getSellerCertificates)
app.post("/admin/update-certificate-status", updateCertificateStatus)


/***************
----Services----
****************/

app.post('/submitForm', submitForm)
app.get('/getMainPageItems', getMainPageItems)
app.post('/getProductPreviewDetails', getProductPreviewDetails)
app.put('/update-personal-info', updatePersonalInfo)
app.put('/update-contact-info', updateContactInfo)
app.post('/get-favorite-products', getFavoriteProducts)

// Get Product by ID
app.get('/services/product/:id', getProductByID)
app.get('/services/cart-product/', getCartProductsByID)
app.get('/categories', getCategories)

app.post('/services/is-favorited', isFavorited)
app.post('/services/add-to-favorites', addToFavorites)
app.post('/services/delete-from-favorites', deleteFromFavorites)

/***************
----Seller----
****************/
app.post('/get-store-products', getStoreProducts)
app.post('/new-seller', newSeller)
app.post('/delete-my-product', deleteMyProduct)
app.get('/services/store/:id', getStoreProductsByID)

// Certificates
app.get('/services/certificates', getCertificates)
app.get('/services/certificates/:id', getCertificatesBySellerID)
app.get('/services/available-certificates/:id', getAvailableCertificatesBySellerID)
app.post("/certificate-approval-request", sendCertificateApprovalRequest)
app.post("/services/delete-certificate", deleteCertificate)
app.post("/services/update-certificate-document", updateCertificateDocument)


/************
----ORDER----
*************/
app.get('/order/get-order-previews/:id', getOrderPreviewsByID)

export { pool }
export default app