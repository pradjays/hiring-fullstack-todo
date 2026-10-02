import {use, useEffect, useState} from "react";
import AddToDo from "./AddToDo";
import TaskList from "./TaskList";
import axios from "axios";

function App() {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
      // Page Header
      <div className="min-h-screen h-full bg-gradient-to-br from-gray-800 to-gray-600">
          <div className="flex items-center justify-center p-4">
              <div className="text-center shadow-lg p-4 w-full max-w-lg">
                  <h1 className="text-3xl font-bold text-white">My To Do List</h1>
                  <h6 className="text-m text-gray-100">Staying on top of things</h6>
              </div>
          </div>

          {/*Add To Do Button*/}
          <div className="flex justify-center p-4">
              <div className="flex items-end mb-4">
                  <button className="bg-gradient-to-br from-violet-800 to-violet-600 p-3 transition duration-700
                  font-bold text-white shadow-xl rounded-2xl cursor-pointer
                  hover:from-purple-600 hover:to-purple-800 hover:scale-102"
                  onClick={() => setShowAddModal(true)}>
                      + Add To Do
                  </button>
              </div>
          </div>

          {/*Add To Do Modal*/}
          { showAddModal &&
          (<div className="fixed inset-0 bg-black/80 backdrop-blur[10px] flex items-center justify-center z-50">
              <div className="w-full max-w-3xl px-8">
                  <AddToDo onCancel={() => setShowAddModal(false)} />
              </div>
          </div>)
          }

          {/*Task List*/}
              <TaskList />
      </div>
  )
}

export default App
