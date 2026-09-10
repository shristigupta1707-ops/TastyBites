// NEW: Middleware to check whether the logged-in user is an Admin
const isAdmin = (req, res, next) => {

    // req.user is added by auth.middleware.js after JWT verification
    if (!req.user || req.user.role !== "Admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }

    // User is an Admin, so allow the request to continue
    next();
};

module.exports = isAdmin;