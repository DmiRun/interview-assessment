require("dotenv").config();

const CliC = require("../controllers/CliController.js");
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.SERVER_URL.split(":")[1];

app.use(cors());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(port, () => {
  console.log(`Server listening on ${hostname}:${port}`);
});
