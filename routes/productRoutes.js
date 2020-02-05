//variables
const express = require("express");
const router = express.Router();
const productsController = require("./../controllers/productsController");

//routes for products
router.route("/").get(productsController.getProducts);

//exporting router
module.exports = router;
