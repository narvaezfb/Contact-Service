const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// connect to DB
connectDB();

// Middleware
app.use(bodyParser.json());

app.use("/api", contactRoutes);

module.exports = app;
