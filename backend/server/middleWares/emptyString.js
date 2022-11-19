module.exports = function (req, res, next) {
  let errors = []; //array to hold errors
  //ARRAY TO HOLD REQUIRED FIELDS
  let requiredFields = [];
  if (req.path == "/auth/signup") {
    requiredFields = ["name", "username", "email", "password"];
  } else if (req.path == "/auth/login") {
    requiredFields = ["email", "password"];
  }

  //OBJECT DESTRUCTURING OF REQ.BODY
  let { name, username, email, password } = req.body;
  if (!name && requiredFields.includes("name")) {
    errors.push("name is required");
  }
  if (!username && requiredFields.includes("username")) {
    errors.push("username is required");
  }
  if (!password && requiredFields.includes("password")) {
    errors.push("password is required");
  }
  if (!email && requiredFields.includes("email")) {
    errors.push("email is required");
  }
  if (email) {
    let regEx = /^[^0-9][a-zA-Z0-9._%+-]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
    if (!regEx.test(email)) {
      errors.push("wrong email format");
    }
  }
  if (errors.length > 0) {
    res.status(400).json({ success: false, message: errors.join(",") });
  } else {
    next();
  }
};
