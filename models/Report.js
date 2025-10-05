const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Report", {
    facultyName: DataTypes.STRING,
    className: DataTypes.STRING,
    weekOfReporting: DataTypes.STRING,
    dateOfLecture: DataTypes.DATEONLY,
    courseName: DataTypes.STRING,
    courseCode: DataTypes.STRING,
    lecturerName: DataTypes.STRING,
    actualNumberPresent: DataTypes.INTEGER,
    totalRegisteredStudents: DataTypes.INTEGER,
    venue: DataTypes.STRING,
    scheduledLectureTime: DataTypes.STRING,
    topicTaught: DataTypes.STRING,
    learningOutcomes: DataTypes.STRING,
    lecturerRecommendations: DataTypes.STRING,
    feedback: DataTypes.STRING,
  });
};
