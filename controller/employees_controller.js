const Employee = require("../models/Employee");

// Fetching all employees
module.exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});

    res.status(200).json(employees);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Deleting the employee
module.exports.delete = async (req, res) => {
  try {
    // Find a habit to be deleted and check if it exists
    let emp = await Employee.findById(req.params.id);
    if (!emp) {
      return res.status(404).send("Employee not found.");
    }

    // actually deleting the habit
    emp = await Employee.findByIdAndDelete(req.params.id);
    return res.json({
      success: "Employee successfully deleted",
      employee: emp,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error.");
  }
};

// Updating the employee
module.exports.update = async (req, res) => {
  try {
    const { name, email, role, isAdmin } = req.body;

    const eid = req.params.id;

    let emp = await Employee.findById(eid);

    if (!emp) {
      return res.status(404).send("Employee not found.");
    }

    let newEmp = { name, role, email, isAdmin };

    emp = await Employee.findByIdAndUpdate(
      eid,
      { $set: newEmp },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: "Employee successfully updated", emp: emp });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error.", error });
  }
};

// assigning employees by admin
module.exports.assign = async (req, res) => {
  try {
    const { name, id } = req.body;

    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.id);

    const eid = req.params.id;

    let emp = await Employee.findById(eid);

    if (!emp) {
      return res.status(404).send("Employee not found.");
    }

    emp = await Employee.findByIdAndUpdate(
      eid,
      { $push: { assignedEmployees: { name, id } } }, // Assuming you send the employee ID in the request body
      { new: true }
    );

    return res
      .status(200)
      .json({ success: "Employee successfully updated", emp: emp });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error.", error });
  }
};

// giving the feedback
module.exports.giveFeedback = async (req, res) => {
  try {
    const afeID = req.params.id;

    console.log("id : => " + afeID);
    let addFeedbackEmp = await Employee.findById(afeID);

    const { feedback, eid } = req.body;

    let givenByEmployee = await Employee.findById(eid);

    // console.log("Add feedback employee : " + addFeedbackEmp);
    // console.log(givenByEmployee);

    // console.log(req.body);

    const GivenByname = givenByEmployee.name;
    const addFeedbackEmpname = addFeedbackEmp.name;
    const addFeedbackEmpID = addFeedbackEmp._id;

    // console.log(GivenByname, addFeedbackEmpname);

    if (!addFeedbackEmp && !givenByEmployee) {
      return res.status(404).send("Employee not found.");
    }

    addFeedbackEmp = await Employee.findByIdAndUpdate(
      req.params.id,
      { $push: { feedbacks: { ...feedback, givenBy: GivenByname } } },
      { new: true }
    );

    givenByEmployee = await Employee.findByIdAndUpdate(
      eid,
      {
        $pull: {
          assignedEmployees: {
            name: addFeedbackEmpname,
            id: addFeedbackEmpID,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: "Feedbacks successfully updated",
      addFeedbackEmp,
      givenByEmployee,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .send({ message: "Internal server error.", error: error.message });
  }
};

module.exports.findEmployee = async (req, res) => {
  try {
    const eid = req.params.id;

    let emp = await Employee.findById(eid);

    console.log(eid);

    return res.status(200).json(emp);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error.");
  }
};
