require("dotenv").config(); // NEW: loads values from .env

const cloudinary = require("cloudinary").v2;


// NEW: Configure Cloudinary using credentials from .env
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = cloudinary;