const Task = require("../models/Task");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//@desc Get all users
//@route GET /api/user
//@access Private/Admin

const getusers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

      //Add task count to each user
      const usersWithTaskCount = await Promise.all(users.map(async (user) => {
            const taskCount = await Task.countDocuments({ assignedTo: user._id,status: "pending" });
            const pendingTasks = await Task.find({ assignedTo: user._id, status: "pending" });
            const inProgressTasks = await Task.find({ assignedTo: user._id, status: "in-progress" });
            const completedTasks = await Task.find({ assignedTo: user._id, status: "done" });
            return { ...user._doc, taskCount, pendingTasks, inProgressTasks, completedTasks };
        }));
        
        res.status(200).json(usersWithTaskCount);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

//@desc get user by id
//@route GET /api/user/:id
//@access Private

const getUserById = async (req, res) => {
    try {
        const user=await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



module.exports={getusers,getUserById};