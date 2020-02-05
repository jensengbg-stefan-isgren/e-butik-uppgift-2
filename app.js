//variables
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//routers
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/shoppingCartRoutes");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//middleware routes
app.use("/products", productRouter);
app.use("/shoppingCart", cartRouter);
app.all("*", (request, response, next) => {
  response.status(404).json({
    status: "failed",
    message: `Cant locate the url: ${request.url}`
  });
});

//exporting app so i can run server from server.js
module.exports = app;
