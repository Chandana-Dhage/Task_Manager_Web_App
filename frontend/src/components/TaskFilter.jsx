import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
    cardStyle,
    inputStyle
} from "../utils/theme";

export default function TaskFilter({

    status,
    priority,
    setStatus,
    setPriority

}) {

    const { darkMode } = useContext(ThemeContext);

    return (

        <div
            className={`rounded-2xl shadow-lg p-6 mb-8 transition-all ${cardStyle(darkMode)}`}
        >

            <h2 className="text-2xl font-bold mb-5">
                Filter Tasks
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <div>

                    <label className="font-semibold">
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none ${inputStyle(darkMode)}`}
                    >
                        <option value="">All Status</option>
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>

                    </select>

                </div>

                <div>

                    <label className="font-semibold">
                        Priority
                    </label>

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={`w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none ${inputStyle(darkMode)}`}
                    >
                        <option value="">All Priority</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                </div>

            </div>

        </div>

    );

}