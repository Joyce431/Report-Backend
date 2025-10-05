const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Rating", {
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    reportId: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
  });
};
