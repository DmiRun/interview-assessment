const express = require("express");

const app = express();

const controller = require("./controllers/AppController.js");

controller.GetPopularRepos();