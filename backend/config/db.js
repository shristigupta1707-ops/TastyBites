// require("dotenv").config();

// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         const connect = await mongoose.connect(process.env.MONGO_URI);

//         console.log(`MongoDB Connected ${connect.connection.host}`);
//     } catch (error) {
//         console.error("MongoDB connection failed", error.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected ${connect.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;