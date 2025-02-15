const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = process.env.JWT_SECRET;

router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, errors: "User already exists" });
      }

      let salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      let newUser = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });

      const data = {
        user: {
          id: newUser.id
        },
      };
      const authToken = jwt.sign(data, jwtSecret, { expiresIn: "24h" });
      res.json({ success: true, authToken: authToken });

    } catch (error) {
      console.log("Error saving user:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const passCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!passCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
