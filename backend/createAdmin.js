require("dotenv").config();

const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const User = require("./models/User");

const createAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({
            email: process.env.ADMIN_EMAIL
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        // Hash admin password
        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        // Create admin
        const admin = await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "Admin"
        });

        console.log("Admin created successfully!");
        console.log("Admin Email:", admin.email);
        console.log("Admin ID:", admin._id);

        process.exit(0);

    } catch (error) {
        console.error("Failed to create admin:", error.message);
        process.exit(1);
    }
};

createAdmin();