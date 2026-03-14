const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");   // <-- configs not config
const identifyRoutes = require("./routes/identifyRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/identify", identifyRoutes);

module.exports = app;