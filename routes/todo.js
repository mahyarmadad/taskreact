const express = require('express')
const router = express.Router();
const Todo = require("../databse/Todo");
const auth = require("../Auth");
const User = require("../databse/User");
const { check, validationResult } = require('express-validator');

// Get todo
router.get("/", auth, async (req, res) => {
    try {
        const todo = await Todo.find({ user: req.user.id }).sort({ date: -1 });
        res.json(todo)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

// Add todo
router.post("/", [auth, check("title", "Please enter a title").not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, text } = req.body;
    try {
        todo = new Todo({ title, text, user: req.user.id });
        todo.save();
        res.json(todo);
    } catch (error) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }

});

// Update todo
router.put("/:id", auth, async (req, res) => {
    const { title, text } = req.body;
    const task = {};
    if (title) task.title = title;
    if (text) task.text = text;
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) { return res.status(400).json({ msg: "Task do not exist" }); }
        if (todo.user.toString() !== req.user.id) { return res.status(401).json({ msg: "Not Aauthorized" }); }
        todo = await Todo.findByIdAndUpdate(req.params.id, { $set: task }, { new: true });
        res.json(todo);
    } catch (error) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) { return res.status(400).json({ msg: "Task do not exist" }); }
        if (todo.user.toString() !== req.user.id) { return res.status(401).json({ msg: "Not Aauthorized" }); }
        await Todo.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "Task deleted" });
    } catch (error) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;

