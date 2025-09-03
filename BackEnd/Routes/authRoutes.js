const express = require('express');
const { registreUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../Middleware/authmiddleware');
const { upload } = require('../Middleware/uploadMiddleware');



const router=express.Router();

router.post("/register",registreUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,updateUserProfile);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
   
   console.log(imageUrl);

    //  Send only ONE response
    return res.status(200).json({imageUrl});
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports=router;
