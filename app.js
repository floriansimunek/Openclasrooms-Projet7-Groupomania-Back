// TODO: Bouncer
// TODO: Helmet

require("dotenv").config();
const express = require("express");
const path = require("path");

const userRoutes = require("./routes/user");
const threadRoutes = require("./routes/thread");
const reactRoutes = require("./routes/react");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//bodyParser
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes);
app.use("/api/thread", threadRoutes);
app.use("/api/thread", reactRoutes);

module.exports = app;
