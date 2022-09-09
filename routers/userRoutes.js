import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  const user = req.body;

  try {
    const hashedPassword = await bcrypt.hash(user.password, 12);

    const newUser = new User({
      email: user.email,
      password: hashedPassword,
    });

    try {
      await newUser.save();

      res.status(201).json({ message: "User created successfully", newUser });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  } catch (error) {
    res.status(500).json({ message: "Password not hashed correctly", error });
  }
});

//LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const registeredUser = await User.findOne({ email: req.body.email });

    if (registeredUser) {
      try {
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          registeredUser.password
        );

        if (passwordMatch) {
          const token = jwt.sign(
            { userId: registeredUser._id, userEmail: registeredUser.email },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
          );
          res.status(200).json({
            message: "User logged in successfully",
            userEmail: registeredUser.email,
            token,
          });
        } else res.status(400).json({ message: "Invalid credentials!!!" });
      } catch (error) {
        res.status(500).json({ message: "Error in password matching", error });
      }
    } else res.status(404).json({ message: "Invalid credentials!!!" });
  } catch (error) {
    res.status(500).json({ message: "Error in finding user", error });
  }
});

export default router;
