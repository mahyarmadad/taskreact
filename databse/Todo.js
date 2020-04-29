const mongoose = require("mongoose");

const Todo = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: "users"
    },
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("todo", Todo);