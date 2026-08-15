require("dotenv").config();
const functions = require("firebase-functions");

// New Routers for the new website
const warehousesCatalogRouter = require("./api/warehousesCatalog/warehouses.routes");
const productsCatalogRouter = require("./api/productsCatalog/products.routes");
const checkoutRouter = require("./api/checkout/checkout.routes");
const ordersCatalogRouter = require("./api/ordersCatalog/orders.routes");
// ********** Express configuration
const express = require("express");
const app = express();

// ********** Request body configuration
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ********** CORS configuration
const cors = require("cors");

app.use(
  cors({
    origin: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Mr Emilio backEnd");
});

// ******************* New website routes *******************

app.use("/api/products-catalog", productsCatalogRouter);
app.use("/api/warehouses-catalog", warehousesCatalogRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders-catalog", ordersCatalogRouter);

// ******************* Routes (END) *******************

exports.app = functions.https.onRequest(app);
