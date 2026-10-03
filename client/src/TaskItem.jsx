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
            props.fetchToDoList();
        } catch (error) {
            console.log("There was an error updating a to do: ", error)
            toast.error("Error updating To Do. Please try again.")
        }
    }

    const deleteToDo = async (id) => {
        try {
            const response = await axios.delete(`api/todos/${id}`)
            toast.success("To Do Deleted!")
            props.fetchToDoList();
        } catch (e) {
            console.log("There was an error deleting a to do: ", e)
            toast.error("Error deleting To Do. Please try again.")
        }
    }

    const markAsDone = async (id) => {
        try {
            const response = await axios.patch(`api/todos/${id}/done`);
            toast.success("Marked as done!")
            props.fetchToDoList();
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
                { props.todo.completed && (
                    <div className="p-4 text-purple">
                        <FaCheckCircle className="stroke-current text-purple-600 text-2xl" />
                    </div>
                )}

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
                    {/*Mark as Done Button*/}
                    { !props.todo.completed && (
                        <div className="p-2 stroke-current text-green-700 text-2xl cursor-pointer
                    hover:text-green-400">
                            <button className="hover:animate-pulse" onClick={() => markAsDone(props.todo._id)}>
                                <FaCheckCircle />
                            </button>
                        </div>
                    )}

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