require("dotenv").config();

const express = require("express");
const cors = require("cors"); // NEW: import CORS

const connectDB = require("./config/db");

const menuRoutes = require("./routes/menu.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();


// Connect to MongoDB
connectDB();


// NEW: Allow requests from our React frontend
app.use(cors());


// Parse JSON request bodies
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api", menuRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Start server
app.listen(5001, () => {
    console.log("Server is running on port 5001");
});