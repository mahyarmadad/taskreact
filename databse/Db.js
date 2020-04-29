const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;