const MenuItem = require("../models/MenuItem");
const cloudinary = require("../config/cloudinary"); // NEW: import Cloudinary


// Get all menu items
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();

        res.status(200).json({
            success: true,
            data: menuItems
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get one menu item by ID
const getMenuItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            success: true,
            data: menuItem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Create a menu item
const createMenuItem = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            price,
            availability
        } = req.body;


        // NEW: Variable to store Cloudinary image URL
        let imageUrl = "";


        // NEW: Only upload to Cloudinary if an image was provided
        if (req.file) {

            // NEW: Upload the temporary file to Cloudinary
            const uploadImage = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "tastybites/menu-items"
                }
            );

            // NEW: Get the image URL returned by Cloudinary
            imageUrl = uploadImage.secure_url;
        }


        // Create menu item in MongoDB
        const menuItem = await MenuItem.create({
            name,
            description,
            category,
            price,
            availability,

            // NEW: Save Cloudinary URL in MongoDB
            image: imageUrl
        });


        res.status(201).json({
            success: true,
            message: "Menu item created successfully",
            data: menuItem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update a menu item
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            description,
            category,
            price,
            availability
        } = req.body;


        // Existing fields to update
        const updateData = {
            name,
            description,
            category,
            price,
            availability
        };


        // NEW: If a new image was uploaded, upload it to Cloudinary
        if (req.file) {

            // NEW: Upload new image
            const uploadImage = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "tastybites/menu-items"
                }
            );

            // NEW: Store new Cloudinary URL
            updateData.image = uploadImage.secure_url;
        }


        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );


        if (!updatedMenuItem) {
            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Menu item updated successfully",
            data: updatedMenuItem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete a menu item
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMenuItem =
            await MenuItem.findByIdAndDelete(id);

        if (!deletedMenuItem) {
            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Menu item deleted successfully",
            data: deletedMenuItem
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};