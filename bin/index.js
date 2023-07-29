require("dotenv").config();
const express = require("express");
const app = express();
const controller = require("./controllers/GetPopularRepos.js");
console.log("index");

let repos;
controller.GetPopularRepos()//.then(data => repos = data);

