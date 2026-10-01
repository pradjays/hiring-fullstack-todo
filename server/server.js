import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import toDoRoutes from "./routes/todoItem.routes.js";

dotenv.config();

const toDoApp = express();

toDoApp.use(express.json());

toDoApp.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000")
});

toDoApp.use("api/todos", toDoRoutes);