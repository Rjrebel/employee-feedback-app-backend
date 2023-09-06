const express = require("express");
const router = express.Router();

router.use("/employees", require("./employees"));
router.use("/auth", require("./auth"));

console.log("router loaded");

module.exports = router;
