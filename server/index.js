require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./controllers/routes.js");

const port = process.env.SERVER_URL.split(":")[1];
app.use(cors());

app.use('/', routes)

app.listen(port, () => {
  console.log(`Server listening on ${process.env.SERVER_URL}`);
});
