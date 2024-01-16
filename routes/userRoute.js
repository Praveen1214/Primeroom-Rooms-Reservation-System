const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newuser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isUser: user.isUser,
        _id: user._id,
      };
      res.json(temp);
    } else {
      return res.status(400).json({ message: "Login failed!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
