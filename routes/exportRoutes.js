const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const { Report } = require("../models");

router.get("/reports", async (req, res) => {
  try {
    // Example: if lecturer name comes from query param OR from authentication middleware
    const lecturerName = req.query.lecturer || "Unknown Lecturer";

    const timestamp = new Date().toLocaleString();
    console.log(`📥 Export request received from ${lecturerName} at ${timestamp}`);

    const reports = await Report.findAll();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Reports");

    sheet.columns = [
      { header: "Faculty Name", key: "facultyName", width: 20 },
      { header: "Class Name", key: "className", width: 15 },
      { header: "Week of Reporting", key: "weekOfReporting", width: 15 },
      { header: "Date of Lecture", key: "dateOfLecture", width: 15 },
      { header: "Course Name", key: "courseName", width: 20 },
      { header: "Course Code", key: "courseCode", width: 15 },
      { header: "Lecturer Name", key: "lecturerName", width: 20 },
      { header: "Students Present", key: "actualNumberPresent", width: 10 },
      { header: "Total Students", key: "totalRegisteredStudents", width: 10 },
      { header: "Venue", key: "venue", width: 15 },
      { header: "Lecture Time", key: "scheduledLectureTime", width: 15 },
      { header: "Topic Taught", key: "topicTaught", width: 20 },
      { header: "Learning Outcomes", key: "learningOutcomes", width: 25 },
      { header: "Recommendations", key: "lecturerRecommendations", width: 25 },
      { header: "Feedback", key: "feedback", width: 25 },
    ];

    reports.forEach((r) => {
      sheet.addRow(r.toJSON());
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=reports.xlsx");

    await workbook.xlsx.write(res);
    console.log(`✅ Excel file sent to ${lecturerName} at ${timestamp}`);

    res.end();
  } catch (err) {
    console.error("❌ Error exporting reports:", err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;
