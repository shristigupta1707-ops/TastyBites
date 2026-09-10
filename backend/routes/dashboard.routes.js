const express = require("express");

const {
    getDashboardStats
} = require("../controllers/dashboard.controller");

const authenticate = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

const router = express.Router();


// GET /api/dashboard
// NEW: Dashboard can only be accessed by Admin
router.get(
    "/",
    authenticate,
    isAdmin,
    getDashboardStats
);

module.exports = router;