const express = require("express");
const { protect, adminonly } = require("../Middleware/authmiddleware");
const { exportTasksReport, exportUsersReport } = require("../controllers/reportController");

const router = express.Router();

// Export Reports (Admin Only)
router.get("/export/tasks", protect, adminonly, exportTasksReport); // Export all tasks as Excel/PDF
router.get("/export/users", protect, adminonly, exportUsersReport); // Export user-task report

module.exports = router;
