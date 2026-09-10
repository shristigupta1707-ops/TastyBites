const express = require("express");

const {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menu.controller");

const authenticate = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");

const upload = require("../middleware/upload.middleware"); // NEW: import Multer

const router = express.Router();


// PUBLIC: Get all menu items
router.get(
    "/menu-items",
    getMenuItems
);


// PUBLIC: Get one menu item
router.get(
    "/menu-items/:id",
    getMenuItemById
);


// ADMIN: Create menu item + image
router.post(
    "/menu-items",
    authenticate,
    isAdmin,
    upload.single("image"), // NEW: receive one file named "image"
    createMenuItem
);


// ADMIN: Update menu item + optional image
router.put(
    "/menu-items/:id",
    authenticate,
    isAdmin,
    upload.single("image"), // NEW
    updateMenuItem
);


// ADMIN: Delete menu item
router.delete(
    "/menu-items/:id",
    authenticate,
    isAdmin,
    deleteMenuItem
);


module.exports = router;