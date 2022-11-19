const bcrypt = require("bcryptjs");
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");

//FNX TO HANDLE CREATING USER
exports.signUpUser = async (req, res) => {
  const newUser = req.body;
  try {
    const userExist = await userModel.findOne({ email: newUser.email });
    // checks if user exist
    if (userExist) {
      res.status(400).json({ success: false, message: "User already Exist" });
    } else {
      //if not, hash their password
      const hash = bcrypt.hashSync(newUser.password);
      newUser.password = hash;
      const user = await userModel.create(newUser);
      console.log("Created User Data", user);
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    }
  } catch (error) {
    console.error(error.name);
    return res.status(404).json({ success: false, message: "User Not found" });
  }
};

//FNX THAT HANDLES THE LOGIN OF A USER
exports.loginUser = async (req, res) => {
  const user = req.body;
  try {
    //Checks if a user exist
    const userExist = await userModel.findOne({ email: user.email });
    if (userExist) {
      //Compares the user's password
      //findOne returns an object not array
      const isPasswordMatch = bcrypt.compareSync(
        user.password,
        userExist.password
      );
      //if password match
      if (isPasswordMatch === true) {
        const tokenPayload = {
          id: userExist._id,
          email: userExist.email,
        };

        //Generate auth token
        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
          expiresIn: "2d",
        });
        return res.status(200).json({
          success: true,
          message: "User Logged in successfully",
          token,
          user: userExist,
        });
      }
      //Respond to the client
      else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }

      // Else respond to the client
    } else {
      //Responds to the client
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }
  } catch (error) {
    //Respond to the client
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", error });
  }
};

//FNX TO GET ALL USERS FROM OUR DATABASE
exports.getUserById = async (req, res) => {
  const id = req.params.id || res.locals.id;
  try {
    //finds the user
    const user = await userModel.findById(id);
    // if found
    if (user) {
      //responds to the client
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } else {
      //responds to the client
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    //responds to the client
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//FNX TO UPDATE A USER
exports.updateAUser = async (req, res) => {
  if (req.body.password) {
    //if not hash their password
    const hash = bcrypt.hashSync(req.body.password);
    req.body.password = hash;
  }

  //gets the id from res.locals
  const userId = res.locals.id;
  //data from req body
  const dataToUpdate = req.body;

  try {
    //find and update the user's data
    const updateData = await userModel.findByIdAndUpdate(userId, dataToUpdate, {
      new: true,
    });

    //checks if data was updated
    if (updateData) {
      res.status(201).json({
        success: true,
        message: "Profile updated successfully",
        data: updateData,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update profile,please try again",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ success: false, message: "Something went wrong", error });
  }
};

// FNX TO DELETE A USER
exports.deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    //find and delete the user
    const deletedUser = await userModel.findByIdAndDelete(id);
    //if deleted
    if (deletedUser) {
      //responds to the client
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } else {
      //responds to the client
      res.status(404).json({ success: false, message: "User not Found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong",
      error,
    });
  }
};
