require("dotenv").config();
const functions = require("firebase-functions");

// New Routers for the new website
const warehousesCatalogRouter = require("./api/warehousesCatalog/warehouses.routes");
const productsCatalogRouter = require("./api/productsCatalog/products.routes");
const checkoutRouter = require("./api/checkout/checkout.routes");
const ordersCatalogRouter = require("./api/ordersCatalog/orders.routes");
const customerAccessRouter = require("./api/customerAccess/customer_access.routes");

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

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },

    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("Welcome to Mr Emilio backEnd");
});

// ******************* New website routes *******************

app.use("/api/products-catalog", productsCatalogRouter);
app.use("/api/warehouses-catalog", warehousesCatalogRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders-catalog", ordersCatalogRouter);
app.use("/api/customer-access", customerAccessRouter);

// ******************* Routes (END) *******************

exports.app = functions.https.onRequest(app);
