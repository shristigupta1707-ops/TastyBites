const multer = require("multer");


// NEW: Configure where uploaded files are temporarily stored
const storage = multer.diskStorage({

    // NEW: Store files inside the uploads folder
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    // NEW: Give each uploaded file a unique filename
    filename: function (req, file, cb) {

        const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1E9);

        cb(
            null,
            file.fieldname + "-" + uniqueSuffix
        );
    }
});


// NEW: Create the Multer upload middleware
const upload = multer({
    storage: storage
});

module.exports = upload;