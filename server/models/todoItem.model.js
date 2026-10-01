import mongoose from 'mongoose';

const todoItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export default TodoItem;