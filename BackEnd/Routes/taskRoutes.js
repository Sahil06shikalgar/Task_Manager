const express = require('express');
const {protect,adminonly} = require('../Middleware/authmiddleware');
const { getDashboardData, getUserDashboardData, getTaskList, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require('../controllers/taskController');

const router=express.Router();
const app = express();
app.use(express.json());


//task management Router
router.get("/dashboard-data",protect,getDashboardData);
router.get("/userdashboard-data",protect,getUserDashboardData);
router.get("/",protect,getTaskList);
router.get("/:id",protect,getTaskById);
router.post("/",protect,adminonly,createTask);
router.put("/:id",protect,adminonly,updateTask);
router.delete("/:id",protect,adminonly,deleteTask);
router.put("/:id/status",protect,adminonly,updateTaskStatus);
router.put("/:id/todo",protect,adminonly,updateTaskChecklist);

module.exports = router;


