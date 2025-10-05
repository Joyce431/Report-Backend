const express = require("express");
const cors = require("cors");
const path = require("path");

// MySQL connection (sequelize instance)
const sequelize = require("./config/database");

// Import models
const Student = require("./models/Student");
const Report = require("./models/Report");
const Rating = require("./models/Rating");

// Import routes
const exportRoutes = require("./routes/exportRoutes");
const studentRoutes = require("./routes/studentRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Register API routes
app.use("/api/export", exportRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/reports", reportRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route for React
app.get("/.*/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const PORT = 5000;

// Sync database and start server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ MySQL database synced");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database sync failed:", err);
  });
