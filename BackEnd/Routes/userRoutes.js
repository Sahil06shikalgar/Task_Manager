const express = require('express');
const { adminonly, protect } = require('../Middleware/authmiddleware');
const { getusers, getUserById,  } = require('../controllers/userController');
const router = express.Router();

//User Management Routes


router.get("/", protect, adminonly, getusers);
router.get("/:id", protect, getUserById);

module.exports = router;
