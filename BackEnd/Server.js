require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
connectDB = require("./Config/db");

const app = express();

const authRoutes = require("./Routes/authRoutes");
const userRoutes=require("./Routes/userRoutes");
const taskRoutes=require("./Routes/taskRoutes");
const reportRoute=require("./Routes/reportRoutes")

app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET,HEAD,PUT,PATCH,POST,DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
    })
);

// Database connection
connectDB();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/report",reportRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});