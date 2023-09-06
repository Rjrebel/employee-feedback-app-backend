const express = require("express");
const app = express();
const port = 1809;
const db = require("./config/mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// set up express router
app.use("/", require("./routes/index"));

// starting the main backend server
app.listen(port, () => {
  console.log(`Employee Feedback app listening on port ${port}`);
});
