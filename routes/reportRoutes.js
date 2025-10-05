const express = require("express");
const router = express.Router();
const { Report } = require("../models");

// Get all reports (students can monitor)
router.get("/", async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
