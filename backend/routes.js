// routes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./database"); // Ensure your DB connection is correctly set up
require("dotenv").config();

const router = express.Router();

// =========================
// User Registration
// =========================
router.post("/register", async (req, res) => {
  const { name, email, password} = req.body;
  console.log("Incoming registration:", { name, email});

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkUserSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserSql, [email], async (err, result) => {
    if (err) {
      console.error("Error checking existing user:", err);
      return res.status(500).json({ message: "Error checking user" });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserSql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(insertUserSql, [name, email, hashedPassword], (err) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ message: "Registration failed" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (hashErr) {
      console.error("Error hashing password:", hashErr);
      res.status(500).json({ message: "Error processing registration" });
    }
  });
});

// =========================
// User Login
// =========================
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const findUserSql = "SELECT * FROM users WHERE email = ?";
  db.query(findUserSql, [email], async (err, result) => {
    if (err) {
      console.error("DB query error during login:", err);
      return res.status(500).json({ message: "Login failed due to server error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (compareErr) {
      console.error("Password comparison failed:", compareErr);
      res.status(500).json({ message: "Login error" });
    }
  });
});

module.exports = router;
