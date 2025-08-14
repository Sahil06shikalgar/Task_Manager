const express = require('express');
const { registreUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../Middleware/authmiddleware');
const { upload } = require('../Middleware/uploadMiddleware');



const router=express.Router();

router.post("/register",registreUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,updateUserProfile);

router.post("/upload-image",upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports=router;
