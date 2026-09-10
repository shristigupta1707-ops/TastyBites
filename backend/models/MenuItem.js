const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        availability: {
            type: Boolean,
            default: true
        },

        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;