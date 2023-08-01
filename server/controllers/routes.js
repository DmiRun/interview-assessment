const express = require("express");
const router = express.Router()
const serverController = require("./serverController.js");

router.get("/api/repositories", serverController.GetController);
router.put("/api/repositories", serverController.PutController);

module.exports = router