import { useContext } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/task-bg-preview.png";
import { ThemeContext } from "../context/ThemeContext";

export default function HomePage() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div>
            <Navbar />
            <div className="p-6"
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", minHeight: "calc(100vh - 64px)" }}>
                <h1
                    className={`text-3xl font-bold text-center md:container md:mx-auto ${darkMode ? "text-white" : "text-gray-900"
                        }`}>Organize your tasks and boost your productivity!</h1>
            </div>
        </div>
    );
}
