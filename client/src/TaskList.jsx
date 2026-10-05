import TaskItem from "./TaskItem";

function TaskList(props) {
    const total = props.initialTodoList.length;
    const completed = props.initialTodoList.filter(item => item.completed).length;
    const pending = props.initialTodoList.filter(item => !item.completed).length;

    const filterToDoList = (type) => {
        switch (type) {
            case 1: props.setTodoList(props.initialTodoList); break;
            case 2: props.setTodoList(props.initialTodoList.filter(item => item.completed)); break;
            case 3: props.setTodoList(props.initialTodoList.filter(item => !item.completed)); break;
            default: break;
        }
    }

    return (
        <div>
            <div className="w-full justify-items-center flex items-center justify-center p-3">
                <div className="w-1/2 flex">
                    <div className="p-4 border border-gray-500 rounded-sm shadow-2xl m-4
                    items-center justify-center w-1/3 cursor-pointer transition duration-300 hover:scale-102"
                    onClick={() => filterToDoList(1)}>
                        <div className="text-center font-bold text-violet-500 text-3xl">{total}</div>
                        <div className="text-center text-gray-300">Total</div>
                    </div>
                    <div className="p-4 border border-gray-500 rounded-sm shadow-2xl m-4
            items-center justify-center w-1/3 cursor-pointer transition duration-300 hover:scale-102"
                         onClick={() => filterToDoList(2)}>
                        <div className="text-center font-bold text-emerald-500 text-3xl">{completed}</div>
                        <div className="text-center text-gray-300">Completed</div>
                    </div>
                    <div className="p-4 border border-gray-500 rounded-sm shadow-2xl m-4
            items-center justify-center w-1/3 cursor-pointer transition duration-300 hover:scale-102"
                         onClick={() => filterToDoList(3)}>
                        <div className="text-center font-bold text-red-500 text-3xl">{pending}</div>
                        <div className="text-center text-gray-300">Pending</div>
                    </div>
                </div>
            </div>

            { props.todoList.length <=0 && (
                <div className="w-full justify-items-center flex items-center justify-center p-3 text-xl text-gray-300">
                    No To Dos Added. Add one to get started!
                </div>
            ) }

            {!props.loading && (
                <div className="w-full justify-items-center content-center justify-center p-3">
                    {props.todoList.length > 0 && (
                        props.todoList.map((todo) => (
                            <TaskItem key={todo._id} todo={todo}
                                      todoList={props.todoList}
                                      setTodoList={props.setTodoList}
                                      initialTodoList={props.initialTodoList}
                                      setInitialTodoList={props.setInitialTodoList}
                            />))
                    )}
                </div>
            )
            }
        </div>
    )
}

export default TaskList;