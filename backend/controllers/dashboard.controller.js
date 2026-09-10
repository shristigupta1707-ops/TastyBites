const MenuItem = require("../models/MenuItem");
const User = require("../models/User");


// NEW: Get dashboard statistics
const getDashboardStats = async (req, res) => {
    try {

        // NEW: Count total menu items
        const totalMenuItems = await MenuItem.countDocuments();

        // NEW: Count total registered users
        const totalUsers = await User.countDocuments();

        // NEW: Assignment asks for Total Orders,
        // but no Order model/API is specified in the assignment.
        const totalOrders = 0;


        // NEW: Send dashboard data
        res.status(200).json({
            success: true,
            data: {
                totalMenuItems,
                totalUsers,
                totalOrders
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getDashboardStats
};