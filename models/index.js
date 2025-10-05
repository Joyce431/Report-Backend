// models/index.js
const Sequelize = require("sequelize");
const sequelize = require("../config/database"); // MySQL connection

// Import models
const StudentModel = require("./Student");
const ReportModel = require("./Report");
const RatingModel = require("./Rating");

// Initialize models
const Student = StudentModel(sequelize);
const Report = ReportModel(sequelize);
const Rating = RatingModel(sequelize);

// Define associations if needed
// A Rating belongs to a Student and a Report
Student.hasMany(Rating, { foreignKey: "studentId", onDelete: "CASCADE" });
Rating.belongsTo(Student, { foreignKey: "studentId" });

Report.hasMany(Rating, { foreignKey: "reportId", onDelete: "CASCADE" });
Rating.belongsTo(Report, { foreignKey: "reportId" });

// Export
module.exports = {
  sequelize,
  Student,
  Report,
  Rating,
};
