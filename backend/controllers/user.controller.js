const User = require("../models/User");


// ADMIN: Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password");

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ADMIN: Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Do not allow Admin to be deleted
        if (user.role === "Admin") {
            return res.status(403).json({
                success: false,
                message: "Admin cannot be deleted"
            });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getUsers,
    deleteUser
};