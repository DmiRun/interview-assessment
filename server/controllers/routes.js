const express = require("express");
const router = express.Router()
const serverController = require("./serverController.js");

router.get("/api/repositories", serverController.GetController);
router.put("/api/repositories", serverController.PutController);
router.delete("/api/repositories", serverController.DeleteController);

module.exports = router