//variables
const express = require("express");
const router = express.Router();
const shoppingCartController = require("./../controllers/shoppingCartController");

//routes for shoppingcart
router
  .route("/")
  .get(shoppingCartController.showShoppingCart)
  .post(
    shoppingCartController.checkAddProductInput,
    shoppingCartController.checkIfProductExists,
    shoppingCartController.checkIfExistsShoppingCart,
    shoppingCartController.addToShoppingCart
  )
  .delete(
    shoppingCartController.checkDeleteProduct,
    shoppingCartController.deleteFromShoppingCart
  );

//exporting router
module.exports = router;
