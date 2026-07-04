import { useState, useContext } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import { ThemeContext } from "../context/ThemeContext";
import {
    cardStyle,
    inputStyle,
    buttonPrimary
} from "../utils/theme";

export default function TaskForm({ onTaskCreated }) {
    const { darkMode } = useContext(ThemeContext);
    const today = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "Medium",
        status: "To Do"
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const validate = () => {

        let temp = {};

        if (!form.title.trim())
            temp.title = "Title is required";

        if (!form.description.trim())
            temp.description = "Description is required";

        if (!form.due_date)
            temp.due_date = "Due date is required";
        else if (form.due_date < today)
            temp.due_date = "Due date cannot be in the past";

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const handleAISuggest = async () => {

        if (!form.title.trim()) {
            toast.error("Please enter a task title first.");
            return;

        }

        try {

            const res = await API.post("/ai/suggest", {
                title: form.title

            });

            setForm(prev => ({
                ...prev,
                description: res.data.description,
                priority: res.data.priority
            }));

            toast.success("AI suggestion generated!");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to generate AI suggestion."
            );

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate())
            return;
        setLoading(true);

        try {
            await API.post("/tasks/", form);
            toast.success("Task Created Successfully");
            setForm({
                title: "",
                description: "",
                due_date: "",
                priority: "Medium",
                status: "To Do"
            });

            setErrors({});

            if (onTaskCreated) {
                onTaskCreated();
            }

        } catch (err) {

            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Server Error");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className={`rounded-2xl shadow-lg p-8 mb-8 transition-all ${cardStyle(darkMode)}`}
        >           <h2 className="text-3xl font-bold mb-6">
                Create New Task
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={form.title}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none ${inputStyle(darkMode)}`} />

                <p className="text-red-500 text-sm mb-3">{errors.title}</p>

                <button
                    type="button"
                    onClick={handleAISuggest}
                    className="bg-olive-500 hover:bg-yellow-700 text-white px-4 rounded-lg mb-3 transition"
                >
                    ✨ AI Suggest
                </button>

                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    className={`border rounded-lg p-3 w-full mb-1 focus:ring-2 focus:ring-blue-500 outline-none ${inputStyle(darkMode)}`} />

                <p className="text-red-500 text-sm mb-3">{errors.description}</p>

                <div className="grid md:grid-cols-3 gap-4">

                    <div>
                        <label className="font-semibold">Due Date</label>

                        <input
                            type="date"
                            name="due_date"
                            min={today}
                            value={form.due_date}
                            onChange={handleChange}
                            className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none ${inputStyle(darkMode)}`} />

                        <p className="text-red-500 text-sm">
                            {errors.due_date}
                        </p>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none ${inputStyle(darkMode)}`} >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>

                    <div>

                        <label className="font-semibold">
                            Status
                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none ${inputStyle(darkMode)}`}                        >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </select>
                    </div>
                </div>

                <button
                    disabled={loading}
                    className={`${buttonPrimary} px-8 py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed`}>
                    {loading ? "Saving..." : "Create Task"}
                </button>

            </form>
        </div>

    );

}