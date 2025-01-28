const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoschema')
const Todo = new mongoose.model("Todo", todoSchema);

router.get('/', async (req, res) => { //select() , limit()
    try {
        // Fetch todos with status "inactive"
        const todos = await Todo.find({ status: "inactive" });

        // Send success response
        res.status(200).json({
            result: todos,
            message: 'Success',
        });
    } catch (err) {
        // Handle errors
        res.status(500).json({
            error: "There was a server-side error!",
            details: err.message, // Optional: Include error details for debugging
        });
    }
});
//Get a todo by ID
router.get('/:id', async (req, res) => {
    try {
        // Fetch the todo by ID
        const todo = await Todo.findById(req.params.id);

        // If no todo is found, return a 404 error
        if (!todo) {
            return res.status(404).json({
                error: "Todo not found",
            });
        }

        // Send success response
        res.status(200).json({
            result: todo,
            message: 'Success',
        });
    } catch (err) {
        // Handle errors
        res.status(500).json({
            error: "There was a server-side error",
            details: err.message, // Optional: Include error details for debugging
        });
    }
});
//Post a Todo
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save(); // Await the save operation directly
        res.status(200).json({
            message: "Todo was inserted successfully",
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server-side error",
        });
    }
});


// Post multiple Todos
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: "Todos were inserted successfully",
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server-side error",
        });
    }
});


// Put a todo
router.put('/:id', async (req, res) => {
    try {
        const result = await Todo.updateOne(
            { _id: req.params.id },
            { $set: { status: 'inactive' } }
        );

        if (result.matchedCount === 0) {
            // No document found with the given ID
            res.status(404).json({ message: "No todo found with the given ID" });
        } else {
            // Successfully updated
            res.status(200).json({ message: "Todo updated successfully" });
        }
    } catch (err) {
        // Handle server-side errors
        res.status(500).json({ error: "There was a server-side error", details: err.message });
    }
});


//delete a TODO
router.delete('/:id', async (req, res) => {
    try {
        // Attempt to delete the todo by ID
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        // If no todo is found, return a 404 error
        if (!deletedTodo) {
            return res.status(404).json({
                error: "Todo not found",
            });
        }

        // Send success response with the deleted todo
        res.status(200).json({
            result: deletedTodo,
            message: 'Todo deleted successfully',
        });
    } catch (err) {
        // Handle errors
        res.status(500).json({
            error: "There was a server-side error",
            details: err.message, // Optional: Include error details for debugging
        });
    }
});

module.exports = router;
