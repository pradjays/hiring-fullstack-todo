import { FaCheckCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import {useEffect, useState} from "react";
import axios from "axios";

function TaskItem (todo) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    console.log(todo)

    useEffect(() => {
        setName(todo.todo.name);
        setDescription(todo.todo.description)
    }, [])

    const updateToDo = async (id) => {
        if (!name.trim()) return;

        try {
            const response = await axios.put(`api/todos/${id}`, {name: name, description: description});
            setName('');
            setDescription('');
            console.log(response)
        } catch (error) {
            console.log("There was an error updating a to do: ", error)
        }
    }

    return (
        <div className="w-full items-center justify-center p-3">
            <div className="flex items-center w-2/4 border border-gray-400
            bg-gray-700 rounded-lg shadow-2xl p-3 transition duration-300 ease-in-out hover:scale-101">
                { todo.todo.completed && (
                    <div className="p-4 text-purple">
                        <FaCheckCircle className="stroke-current text-purple-600 text-2xl" />
                    </div>
                )}

                {/*Show Task Name and Description when not editing*/}
                { !isEditing && (
                    <div className="flex-1">
                        <div className="text-gray-300 font-bold">
                            {todo.todo.name}
                        </div>
                        { todo.todo.description && (
                            <div className="text-gray-400">
                                {todo.todo.description}
                            </div>
                        ) }
                    </div>
                )}

                { isEditing && (
                    <div className="flex-1 transition transform">
                        <input className="w-full p-2 outline-none bg-gray-600 text-gray-300 rounded-lg mb-3
                        focus:ring ring-purple-500"
                               type="text"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               placeholder="Task Name"/>
                        <textarea className="w-full p-2 outline-none bg-gray-600 text-gray-300 rounded-lg
                        focus:ring ring-purple-500"
                                  placeholder="Task Description"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  rows="4"/>
                    </div>
                )}

                <div className="flex p-4">
                    <div className="p-2 stroke-current text-gray-400 text-2xl cursor-pointer
                    hover:text-gray-100">
                        { !isEditing && !todo.todo.completed && (
                            <button onClick={() => setIsEditing(true)}
                                    className="hover:animate-pulse">
                                <AiFillEdit />
                            </button>
                        )}

                        { isEditing && (
                            <button onClick={(e) => {
                                setIsEditing(false);
                                updateToDo(todo.todo._id);
                            }}
                                    className="hover:animate-pulse">
                                <IoMdSave />
                            </button>
                        )}

                    </div>
                    <div className="p-2 stroke-current text-red-400 text-2xl cursor-pointer
                    hover:text-red-300">
                        <button className="hover:animate-pulse">
                            <MdDelete />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;