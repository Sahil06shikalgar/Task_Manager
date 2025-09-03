const User=require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const genratetoToken=(userId)=>{
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

const registreUser= async (req, res) => {
    try{
        const { name, email, password,profileImageUrl,adminInviteToken } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        let role = "member"; // Default role
        // Check if adminInviteToken is provided and matches the environment variable
        if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }

       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role ,   
        });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImageUrl: user.profileImageUrl,
                role: user.role,
                token: genratetoToken(user._id),
                
            });

           

          
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
         console.error("Register Error:", error);
        return res.status(500).json({ message: "Server error" });
        
    }   
};

const loginUser = async (req, res) => {
     try{

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            token: genratetoToken(user._id),
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    } 
};

//

const getUserProfile = async (req, res) => {
     try{

        const user= await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
        
     } catch (error) {
        return res.status(500).json({ message: "Server error" });
    } 
};

const updateUserProfile = async (req, res) => {
    try{
        const user=await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        req.user = updatedUser;
        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImageUrl: updatedUser.profileImageUrl,
            role: updatedUser.role,
           token: genratetoToken(updatedUser._id),
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports={
    registreUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    genratetoToken
}