const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");

// Creating a Employee
module.exports.createEmployee = async (req, res) => {
  try {
    let success = false;
    let emp = await Employee.findOne({ email: req.body.email });
    if (emp) {
      return res.status(400).json({
        success,
        error: "Sorry, User with this email already exists.",
      });
    }

    const { name, email, password, role } = req.body;

    console.log(req.body);

    const employee = new Employee({
      name,
      email,
      password,
      role,
      isAdmin: false,
    });

    const savedEmployee = await employee.save();

    const data = {
      user: {
        id: savedEmployee.id,
      },
    };

    const JWT_SEC = "IamRJandSheIsCute";

    const authToken = jwt.sign(data, JWT_SEC);
    console.log(authToken);
    success = true;

    res.json({ success, authToken, isAdmin: savedEmployee.isAdmin });
  } catch (error) {
    console.log(error.message + " Error here");
    res.status(500).send("Internal server error.");
  }
};

// get employee details
module.exports.getEmployee = async (req, res) => {
  try {
    const empId = req.user.id;
    const token = req.authToken;
    const emp = await Employee.findById(empId).select("-password");
    res.json({ success: true, emp, authToken: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Login employee
module.exports.login = async (req, res) => {
  // email and password coming from Employee(user) try to login
  const { email, password } = req.body;

  try {
    let emp = await Employee.findOne({ email });
    let success = true;

    if (!emp) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please use correct email and password to Login.",
      });
    }

    if (password !== emp.password) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please use correct email and password to Login.",
      });
    }

    const data = {
      user: {
        id: emp.id,
      },
    };

    const JWT_SEC = "IamRJandSheIsCute";

    const authToken = jwt.sign(data, JWT_SEC);
    // console.log(authToken);

    return res
      .status(200)
      .json({ success: true, authToken, isAdmin: emp.isAdmin, userId: emp.id });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// update employee details
module.exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // create a newEmployee Object
    const newEmployee = {
      name,
      email,
      role,
    };

    // Find a emp to be updated and check if it exists
    let emp = await Employee.findById(req.params.id);
    if (!emp) {
      return res.status(404).send("Employee not found.");
    }

    // actually updating the emp
    emp = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: newEmployee },
      { new: true }
    );
    res.json(emp);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};
