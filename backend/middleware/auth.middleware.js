const jwt = require("jsonwebtoken");

// NEW: Middleware to verify JWT token
const authenticate = (req, res, next) => {
    try {
        // NEW: Get Authorization header
        const authHeader = req.headers.authorization;

        // NEW: Check whether token was provided
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });
        }

        // NEW: Authorization header format:
        // Bearer <token>
        const token = authHeader.split(" ")[1];

        // NEW: Verify the JWT using our secret
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // NEW: Store decoded user information in request
        req.user = decoded;

        // NEW: Allow request to continue
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authenticate;