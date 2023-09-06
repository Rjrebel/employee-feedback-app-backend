const jwt = require("jsonwebtoken");

const JWT_SEC = "IamRJandSheIsCute";

const fetchEmployee = (req, res, next) => {
  // get the user from jwt token and add the id to the req object
  const token = req.header("authToken");
  console.log(token);
  if (!token) {
    return res
      .status(401) //access denied number - 401
      .json({ error: "Please authenticate using valid token." });
  }

  try {
    const data = jwt.verify(token, JWT_SEC);
    req.user = data.user;
    req.authToken = token;
    next();
  } catch (error) {
    res
      .status(401) //access denied number - 401
      .json({ error: "Please authenticate using valid token." });
  }
};

module.exports = fetchEmployee;
