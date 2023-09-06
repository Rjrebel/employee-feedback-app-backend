const express = require("express");
const router = express.Router();

const employeesController = require("../controller/employees_controller");

router.get("/get-all-employees", employeesController.getAllEmployees);
router.delete("/delete-employee/:id", employeesController.delete); 
router.put("/update-employee/:id", employeesController.update);
router.put("/assign-employee/:id", employeesController.assign);
router.put("/add-feedback/:id", employeesController.giveFeedback);
router.get("/find-emp/:id", employeesController.findEmployee);

module.exports = router;
