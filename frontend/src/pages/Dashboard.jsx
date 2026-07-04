import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import TaskFilter from "../components/TaskFilter";
import API from "../services/api";
import { ThemeContext } from "../context/ThemeContext";
import { pageStyle, buttonPrimary } from "../utils/theme";

export default function Dashboard() {

    const { darkMode } = useContext(ThemeContext);
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const loadTasks = async () => {

        try {
            const res = await API.get("/tasks/", {
                params: {
                    status,
                    priority
                }
            });

            setTasks(res.data);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        loadTasks();

    }, [status, priority]);

    return (

        <div className={`min-h-screen transition-all ${pageStyle(darkMode)}`}>

            <Navbar />

            <div className="max-w-7xl mx-auto px-5 py-8">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

                    <h1 className="text-4xl font-bold">
                        My Tasks
                    </h1>

                    <div className="flex gap-3 mt-5 md:mt-0">

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className={`${buttonPrimary} px-5 py-3`}
                        >
                            {showForm ? "Close" : "+ New Task"}
                        </button>

                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-5 py-3 transition"
                        >
                            {showFilter ? "Close" : "Filter Tasks"}
                        </button>

                    </div>

                </div>

                {showForm && (
                    <TaskForm
                        onTaskCreated={loadTasks}
                    />

                )}

                {showFilter && (
                    <TaskFilter
                        status={status}
                        priority={priority}
                        setStatus={setStatus}
                        setPriority={setPriority}
                    />

                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

                    {tasks.length === 0 ? (
                        <div className="col-span-full text-center text-xl opacity-70">
                            No Tasks Found
                        </div>

                    ) : (

                        tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onTaskUpdated={loadTasks}
                                onTaskDeleted={loadTasks}
                            />
                        ))

                    )}

                </div>
            </div>
        </div>

    );

}