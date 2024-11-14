const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/api");

const server = express();
server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

server.use(bodyParser.json({ limit: "1mb" }));
server.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

server.use(express.json());
server.use(cookieParser());

server.use("/api/", router);

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/api/`);
      console.log("Connected to the database");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
