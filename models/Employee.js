const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    feedbacks: [
      {
        givenBy: String,
        rating: Number,
        description: String,
      },
    ],

    assignedEmployees: [
      {
        name: {
          type: String,
        },

        id: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
