require("dotenv").config();
const functions = require("firebase-functions");

const productsRouter = require("./api/products/products.routes");

const productsCatalogRouter = require("./api/productsCatalog/products.routes");

const warehousesRouter = require("./api/warehouses/warehouses.routes");

const warehousesCatalogRouter = require("./api/warehousesCatalog/warehouses.routes");

// const paymentsRouter = require("./api/payments/payments.routes");

const companyRouter = require("./api/company/company.routes");

const ordersRouter = require("./api/orders/orders.routes");

const storesRouter = require("./api/stores/stores.routes");

const usersRouter = require("./api/users/users.routes");

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

// ******************* Legacy routes *******************

app.use("/api/products", productsRouter);

app.use("/api/warehouses", warehousesRouter);

// app.use("/api/payments", paymentsRouter);

app.use("/api/company", companyRouter);

app.use("/api/orders", ordersRouter);

app.use("/api/stores", storesRouter);

app.use("/api/users", usersRouter);

// ******************* New website routes *******************

app.use("/api/products-catalog", productsCatalogRouter);

app.use("/api/warehouses-catalog", warehousesCatalogRouter);

// ******************* Routes (END) *******************

exports.app = functions.https.onRequest(app);
