import {useState} from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast, {Toaster} from "react-hot-toast";


function AddToDo(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameValidation, setNameValidation] = useState(false);

    const addNewToDo = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            setNameValidation(false);
            const response = await axios.post("/api/todos", {name: name, description: description});
            setName('');
            setDescription('');
            toast.success("To Do Added!")
            props.fetchToDoList();
            props.onCancel();
        } catch (error) {
            console.log("There was an error adding a new to do: ", error)
            toast.error("Error Adding New To Do. Please try again.")
        }
    }

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700
            rounded-xl shadow-xl items-center justify-center p-4">
            <Toaster />
            <div className="flex items-center justify-center p-4">
                <h1 className="w-full font-bold text-white">Add New To Do</h1>
                <button className="cursor-pointer text-white"
                onClick={props.onCancel}>
                    <IoIosCloseCircleOutline />
                </button>
            </div>
            <div className="flex items-center justify-center px-3">
                <form onSubmit={addNewToDo} className="w-full">
                    <input className={`w-full p-2 outline-none bg-gray-500 text-gray-900 rounded-lg
                         ${nameValidation ? `ring ring-red-500` : `focus:ring ring-purple-500 mb-3` }`}
                           type="text"
                           name="name"
                           value={name}
                           onChange={(e) => {
                               setName(e.target.value);
                               setNameValidation(name.trim().length <= 3);
                           }}
                           placeholder="Task Name"/>
                    { nameValidation && (
                        <div className="p-2 text-red-500">Name requires at least one character</div>
                    ) }
                    <textarea className="w-full p-2 outline-none bg-gray-500 text-gray-900 rounded-lg mb-3
                    focus:ring ring-purple-500"
                              placeholder="Task Description"
                              name="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows="4"/>
                    <button className="w-full bg-gradient-to-br from-violet-800 to-violet-600 p-3
                  font-bold text-white shadow-xl rounded-2xl cursor-pointer
                  hover:from-purple-600 hover:to-purple-800 transition"
                    type="submit">
                        + Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddToDo;