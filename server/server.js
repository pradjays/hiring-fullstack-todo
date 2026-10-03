import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import toDoRoutes from "./routes/todoItem.routes.js";
import cors from "cors";

dotenv.config();

const toDoApp = express();

toDoApp.use(cors({
    origin: "http://localhost:5173", // Allow frontend requests
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
}));

toDoApp.use(express.json());

toDoApp.use("/api/todos", toDoRoutes);

toDoApp.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000")
});
