import { FaCheckCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import {useEffect, useState} from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function TaskItem (props) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(props.todo.name);
        setDescription(props.todo.description)
    }, [])

    const updateToDo = async (id) => {
        if (!name.trim()) return;

        try {
            const response = await axios.put(`/api/todos/${id}`,
                {name: name, description: description});
            setName('');
            setDescription('');
            toast.success("To Do Updated!")
            props.setTodoList(props.todoList.map(item => item._id === id ? response.data : item));
            props.setInitialTodoList(props.initialTodoList.map(item => item._id === id ? response.data : item));
        } catch (error) {
            console.log("There was an error updating a to do: ", error)
            toast.error("Error updating To Do. Please try again.")
        }
    }

    const deleteToDo = async (id) => {
        try {
            await axios.delete(`api/todos/${id}`)
            toast.success("To Do Deleted!")
            props.setTodoList(props.todoList.filter(item => item._id !== id));
            props.setInitialTodoList(props.initialTodoList.filter(item => item._id !== id));
        } catch (e) {
            console.log("There was an error deleting a to do: ", e)
            toast.error("Error deleting To Do. Please try again.")
        }
    }

    const markAsDone = async (id) => {
        try {
            const response = await axios.patch(`api/todos/${id}/done`);
            toast.success(props.todo.completed ? "Marked as Undone!" : "Marked as Done!");
            props.setTodoList(props.todoList.map(item => item._id === id ? response.data : item));
            props.setInitialTodoList(props.initialTodoList.map(item => item._id === id ? response.data : item));
        } catch (e) {
            console.log("There was an error deleting a to do: ", e)
            toast.error("Error marking To Do as Done. Please try again.")
        }
    }

    return (
        <div className="w-full p-2 justify-items-center">
            <Toaster />
            <div className={`flex items-center w-2/4 border border-gray-400 bg-gray-700
            ${props.todo.completed ? `line-through text-gray-200` : `hover:scale-101`} rounded-lg shadow-2xl px-4 transition 
            duration-300 ease-in-out`}>
                {/*Mark as Done/Undone Button*/}
                <div className={`p-4 stroke-current ${props.todo.completed ? `text-purple-700` : `text-gray-500`} text-2xl cursor-pointer
                        hover:text-purple-400`}>
                    <button className="hover:scale-101" onClick={() => markAsDone(props.todo._id)}>
                        <FaCheckCircle />
                    </button>
                </div>

                {/*Show Task Name and Description when not editing*/}
                { !isEditing && (
                    <div className="flex-1">
                        <div className={`text-gray-300 ${props.todo.completed ? `` : `font-bold`}`}>
                            {props.todo.name}
                        </div>
                        { props.todo.description && (
                            <div className="text-gray-400">
                                {props.todo.description}
                            </div>
                        ) }
                    </div>
                )}

                {/*Show Input Boxes When Editing*/}
                { isEditing && (
                    <div className="flex-1 transition transform">
                        <input className="w-full p-2 outline-none bg-gray-600 text-gray-300 rounded-lg mt-3 mb-3
                        focus:ring ring-purple-500"
                               type="text"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               placeholder="Task Name"/>
                        <textarea className="w-full p-2 outline-none bg-gray-600 text-gray-300 rounded-lg
                        focus:ring ring-purple-500 mb-3"
                                  placeholder="Task Description"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  rows="4"/>
                    </div>
                )}

                <div className="flex p-4">
                    {/*Edit and Save Buttons for Task*/}
                    <div className="p-2 stroke-current text-gray-400 text-2xl cursor-pointer
                    hover:text-gray-100">
                        { !isEditing && !props.todo.completed && (
                            <button onClick={() => setIsEditing(true)}
                                    className="hover:animate-pulse">
                                <AiFillEdit />
                            </button>
                        )}

                        { isEditing && (
                            <button onClick={(e) => {
                                setIsEditing(false);
                                updateToDo(props.todo._id);
                            }}
                                    className="hover:animate-pulse">
                                <IoMdSave />
                            </button>
                        )}

                    </div>

                    {/*Delete Button for Task*/}
                    <div className="p-2 stroke-current text-red-400 text-2xl cursor-pointer
                    hover:text-red-300">
                        <button className="hover:animate-pulse" onClick={() => deleteToDo(props.todo._id)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;