const express = require("express");
const router = express.Router();
const { Student } = require("../models");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existing = await Student.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({ fullName, email, password: hashedPassword });

    res.status(201).json({ id: student.id, fullName, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ where: { email } });
    if (!student) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    res.json({ id: student.id, fullName: student.fullName, email: student.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
