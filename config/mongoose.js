const mongoose = require("mongoose");
require("dotenv").config();

main().catch((err) => console.log(err));

main().then(() => {
  console.log("Connected to mongoDB successfully.");
});

// connecting to MongoDB server
async function main() {
  await mongoose.connect(process.env.DB_URI);
}
