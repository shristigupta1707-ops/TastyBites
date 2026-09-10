const express = require("express");

const {
    getUsers,
    deleteUser
} = require("../controllers/user.controller");

const authenticate = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

const router = express.Router();


// GET /api/users
// NEW: Get all users - Admin only
router.get(
    "/",
    authenticate,
    isAdmin,
    getUsers
);


// DELETE /api/users/:id
// NEW: Delete a user - Admin only
router.delete(
    "/:id",
    authenticate,
    isAdmin,
    deleteUser
);

module.exports = router;