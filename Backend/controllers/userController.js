const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageURL = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";
    console.log(email, name, password);
    const newUser = new userModel({
      name,
      email,
      password,
      role: process.env.DefaultUser,
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  userModel
    .findOne({ email: email.toLowerCase() })
    .populate("role")
    .then(async (result) => {
      console.log("result", result);
      if (!result) {
        res.status(404).json({
          success: false,
          message: "Invalid email or password",
        });
      } else {
        const isMatch = await bcrypt.compare(password, result.password);
        if (!isMatch) {
          res.status(404).json({
            success: false,
            message: "Invalid email or password",
          });
        } else {
          const payload = {
            id: result._id,
            type: result.role?.type,
            permissions: result.role?.permissions || [],
          };
          const options = {
            expiresIn: "3h",
          };
          const userToken = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: "Login successfully",
            token: userToken,
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

const getProfile = (req, res) => {
  const id = req.token.id;
  console.log("id", id);
  userModel
    .findById(id)
    .then((result) => {
      res.status(200).json({
        success: true,
        profile: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};

const updateProfile = (req, res) => {
  const id = req.token.id;
  console.log("update id", id);
  const update = req.body;
  if (req.file) {
    update.imageURL = `http://localhost:5000/uploads/${req.file.filename}`;
  }
  console.log(update);
  userModel
    .findByIdAndUpdate(id, update, { new: true })
    .then((result) => {
      if (!result) {
        console.log(result);
        res.status(404).json({
          success: false,
          message: "Something went wrong",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "User updated successfully",
          user: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};
const getAllUser = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({
          success: false,
          message: "No user was found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "All users",
          users: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete(id)
    .then((result) => {
      console.log(result)
      if (!result) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUser,
  deleteUser,
  register,
  login
};
