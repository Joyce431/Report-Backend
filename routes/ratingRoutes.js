const express = require("express");
const router = express.Router();
const { Rating } = require("../models");

// Submit or update a rating
router.post("/", async (req, res) => {
  try {
    const { studentId, reportId, rating } = req.body;

    let existing = await Rating.findOne({ where: { studentId, reportId } });
    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json(existing);
    }

    const newRating = await Rating.create({ studentId, reportId, rating });
    res.status(201).json(newRating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get ratings for a report
router.get("/report/:reportId", async (req, res) => {
  try {
    const ratings = await Rating.findAll({ where: { reportId: req.params.reportId } });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
