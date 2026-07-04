import { useState, useContext } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import { ThemeContext } from "../context/ThemeContext";
import {
    cardStyle,
    inputStyle,
    buttonPrimary,
    buttonDanger,
    buttonSuccess
} from "../utils/theme";

export default function TaskCard({

    task,
    onTaskUpdated,
    onTaskDeleted

}) {

    const { darkMode } = useContext(ThemeContext);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({

        title: task.title,
        description: task.description,
        due_date: task.due_date,
        priority: task.priority,
        status: task.status
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {

        try {

            await API.put(`/tasks/${task.id}`, form);
            toast.success("Task Updated Successfully");
            setEditing(false);
            onTaskUpdated();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Update Failed"
            );
        }
    };

    const handleDelete = async () => {

        if (!window.confirm("Delete this task?"))
            return;

        try {

            await API.delete(`/tasks/${task.id}`);
            toast.success("Task Deleted Successfully");
            onTaskDeleted();

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Delete Failed"

            );

        }

    };

    const priorityBadge = () => {

        switch (task.priority) {

            case "High":
                return "bg-red-100 text-red-700";

            case "Medium":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-green-100 text-green-700";

        }

    };

    const statusBadge = () => {

        switch (task.status) {

            case "Done":
                return "bg-green-100 text-green-700";

            case "In Progress":
                return "bg-blue-100 text-blue-700";

            default:
                return "bg-gray-200 text-gray-700";

        }

    };

    if (editing) {

        return (

            <div className={`rounded-2xl shadow-lg p-6 transition-all ${cardStyle(darkMode)}`}>

                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 mb-3 ${inputStyle(darkMode)}`}
                />

                <textarea
                    rows="4"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 mb-3 ${inputStyle(darkMode)}`}
                />

                <input
                    type="date"
                    name="due_date"
                    value={form.due_date}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 mb-3 ${inputStyle(darkMode)}`}
                />

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 mb-3 ${inputStyle(darkMode)}`}
                >

                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 mb-5 ${inputStyle(darkMode)}`}
                >

                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                </select>

                <div className="flex gap-3">

                    <button
                        onClick={handleUpdate}
                        className={`${buttonSuccess} flex-1 py-2`}
                    >
                        Save
                    </button>

                    <button
                        onClick={() => setEditing(false)}
                        className="flex-1 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition"
                    >
                        Cancel
                    </button>

                </div>
            </div>
        );

    }

    return (

        <div
            className={`rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 ${cardStyle(darkMode)}`} >

            <div className="flex justify-between items-start">

                <h2 className="text-xl font-bold">
                    {task.title}
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityBadge()}`}>
                    {task.priority}
                </span>

            </div>

            <p className="mt-4 opacity-80">
                {task.description}
            </p>

            <div className="flex justify-between items-center mt-5">

                <span>
                    📅 {task.due_date}
                </span>

                <span
                    className={`px-3 py-1 rounded-full text-sm ${statusBadge()}`}>
                    {task.status}
                </span>

            </div>

            <div className="flex gap-3 mt-6">

                <button
                    onClick={() => setEditing(true)}
                    className={`${buttonPrimary} flex-1 py-2`}
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className={`${buttonDanger} flex-1 py-2`}
                >
                    Delete
                </button>

            </div>
        </div>
    );

}