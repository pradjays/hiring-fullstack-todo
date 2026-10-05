import express from 'express';
import TodoItem from "../models/todoItem.model.js";

const router = express.Router();

//Get All ToDo Items
router.get("/", async (req, res) => {
    try {
        const todoItems = await TodoItem.find();
        res.json(todoItems);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

//Add a ToDo Item
router.post("/", async (req, res) => {
    const toDo = new TodoItem({
        name: req.body.name,
        description: req.body.description
    })
    try {
        const newToDo = await toDo.save();
        res.status(200).json(newToDo);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
})

//Update a ToDo Item
router.put("/:id", async (req, res) => {
    try {
        const todoToUpdate = await TodoItem.findById(req.params.id);
        if (!todoToUpdate) return res.status(400).json({message: "To Do Not Found for Given ID"});

        if (req.body.name !== undefined) {
            todoToUpdate.name = req.body.name;
        }
        if (req.body.description !== undefined) {
            todoToUpdate.description = req.body.description;
        }

        const updatedToDoItem = await todoToUpdate.save();
        res.status(200).json(updatedToDoItem);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
})

//Toggle ToDo Item Status
router.patch("/:id/done", async (req, res) => {
    try {
        const todoToUpdate = await TodoItem.findById(req.params.id);
        if (!todoToUpdate) return res.status(400).json({message: "To Do Not Found for Given ID"});

        todoToUpdate.completed = !todoToUpdate.completed;

        const updatedToDoItem = await todoToUpdate.save();
        res.status(200).json(updatedToDoItem);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
})


//Delete ToDo Item
router.delete("/:id", async (req, res) => {
    try {
        await TodoItem.findByIdAndDelete(req.params.id)
        res.json({message: "Deleted ToDo ID: "+ req.params.id})
    } catch (e) {
        res.status(500).json({message: e.message});
    }
})

export default router;