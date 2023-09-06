const express = require("express");
const router = express.Router();

const authController = require("../controller/auth_controller");
const fetchEmployee = require("../middlewares/fetchEmployee");

router.post("/create-employee", authController.createEmployee);
router.post("/login", authController.login);
router.get("/get-employee", fetchEmployee, authController.getEmployee);
router.get("/update-employee", fetchEmployee, authController.updateEmployee);

module.exports = router;
