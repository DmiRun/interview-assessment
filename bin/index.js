const express = require("express");
const app = express();
const controller = require("./controllers/GetPopularRepos.js");

let repos;
controller.GetPopularRepos().then(data => repos = data);

