import {useEffect, useState} from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

function TaskList() {
    const [todoList, setTodoList] = useState([]);
    const [total, setTotal] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [pending, setPending] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchToDoList = async () => {
        try {
            const response = await axios.get("/api/todos");
            setTodoList(response.data);
            setTotal(todoList.length);
            setCompleted(todoList.filter(item => item.completed).length);
            setPending(todoList.filter(item => !item.completed).length);
        } catch (e) {
            console.log("Error fetching data. ", e)
        } finally {
            setLoading(false);
            console.log(todoList)
        }
    }

    useEffect(() => {
        fetchToDoList();
    }, [])

    return (
        <div>
            <div className="w-full justify-items-center flex items-center justify-center p-3">
                <div className="w-1/2 flex">
                    <div className="p-4 border border-gray-500 rounded-sm shadow-2xl m-4
            items-center justify-center w-1/3 cursor-pointer">
                        <div className="text-center font-bold text-violet-500 text-3xl">{total}</div>
                        <div className="text-center text-gray-300">Total</div>
                    </div>
                    <div className="p-4 border border-gray-500 rounded-sm shadow-2xl m-4
            items-center justify-center w-1/3 cursor-pointer">
                        <div className="text-center font-bold text-emerald-500 text-3xl">{completed}</div>
                        <div className="text-center text-gray-300">Completed</div>
                    </div>
                    <div className="p-4 border border-gray-500 rounded-sm shadow-2xl m-4
            items-center justify-center w-1/3 cursor-pointer">
                        <div className="text-center font-bold text-red-500 text-3xl">{pending}</div>
                        <div className="text-center text-gray-300">Pending</div>
                    </div>
                </div>
            </div>
            {!loading && (
                <div className="w-full justify-items-center content-center justify-center p-3">
                    {todoList.length > 0 && (
                        todoList.map((todo) => (<TaskItem key={todo._id} todo={todo}/>))
                    )}
                </div>
            )
            }
        </div>
    )
}

export default TaskList;