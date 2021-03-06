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
import { updatePersonalInfo, updateContactInfo, getFavoriteProducts, newSeller, getAddresses, removeAddress, updateAddress, newAddress } from "./services/account";
import { addProductToStore, approveOrder, cancelOrder, deleteCertificate, deleteMyProduct, editProductOfStore, getAvailableCertificatesBySellerID, getCertificates, getCertificatesBySellerID, getCompanyDetails, getOrdersBySellerID, getStoreProducts, getStoreProductsByID, sendCertificateApprovalRequest, updateCertificateDocument } from "./services/seller";
import { addShipper, deleteOrder, deleteSeller, deleteShipper, deleteUser, getOrders, getSellerCertificates, getSellers, getShippers, getUsers, updateCertificateStatus, updateOrderStatus } from "./services/admin-advanced";
import { createNewOrder, getOrderDetailsByOrderNumber, getOrderPreviewsByID } from "./services/order";
import { translate } from "./services/translate";
import { getAllChildCategories, getSearchResults } from "./services/search";

// Database Pool
var pool = mysql.createPool({
    // connectionLimit: 10,
    host: 'DATABASE HOST',
    user: 'DATABASE USER',
    password: 'DATABASE PASSWORD',
    port: 3306,
    database: 'organicity',
    multipleStatements: true
});



app.post("/services/translate", translate)
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
app.post("/admin/update-order-status", updateOrderStatus)


/***************
----Services----
****************/

app.post('/submitForm', submitForm)
app.get('/getMainPageItems', getMainPageItems)
app.post('/getProductPreviewDetails', getProductPreviewDetails)
app.put('/update-personal-info', updatePersonalInfo)
app.put('/update-contact-info', updateContactInfo)
app.post('/get-favorite-products', getFavoriteProducts)
app.post('/get-addresses', getAddresses)
app.put('/remove-address', removeAddress)
app.put('/update-address', updateAddress)
app.post('/new-address', newAddress)

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
app.post('/add-product-to-store', addProductToStore)
app.put('/edit-product-of-store', editProductOfStore)
app.post('/seller/get-orders', getOrdersBySellerID)
app.post('/seller/approve-order', approveOrder)
app.post('/seller/get-datails', getCompanyDetails)
app.post('/seller/cancel-order', cancelOrder)

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
app.get('/order/get-order-details/:id', getOrderDetailsByOrderNumber)
app.post('/order/new-order', createNewOrder)

/************
----SEARCH----
*************/
app.get('/search', getSearchResults)
app.get('/get-all-child-categories', getAllChildCategories)
app.get('/get-all-child-categories/:id', getAllChildCategories)

export { pool }
export default app