import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import {
    navbarStyle,
    buttonDanger
} from "../utils/theme";

export default function Navbar() {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const { token, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/login");

    };

    return (

        <nav className={`${navbarStyle(darkMode)}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    to={token ? "/home" : "/login"}
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"
                        }`}>
                    Task Manager
                </Link>

                {/* Desktop Controls */}
                <div className="hidden md:flex items-center gap-6">

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition
                            ${darkMode
                                ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                            }`}>
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    {!token ? (
                        <Link
                            to="/login"
                            className={`font-bold transition hover:text-gray-500 ${darkMode
                                ? "text-black-200"
                                : "text-black-700"
                                }`}>
                            Login
                        </Link>

                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className={`font-medium transition hover:text-gray-500 ${darkMode
                                    ? "text-gray-200"
                                    : "text-gray-700"
                                    }`}>
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className={`font-medium transition hover:text-gray-500 ${darkMode
                                    ? "text-gray-200"
                                    : "text-gray-700"
                                    }`}>
                                Logout
                            </button>
                        </>
                    )}

                </div>
                {/* Mobile Controls */}
                <div className="flex items-center gap-2 md:hidden">

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode
                            ? "bg-gray-700 text-yellow-300"
                            : "bg-gray-100 text-gray-700"
                            }`}>
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`text-2xl ${darkMode ? "text-white" : "text-gray-900"
                            }`}>
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="flex flex-col mt-4 gap-3 md:hidden">

                    {!token ? (
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
                                }`}>
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
                                    }`}>
                                Dashboard
                            </Link>

                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="text-left text-red-500 font-medium">
                                Logout
                            </button>
                        </>
                    )}

                </div>
            )}

        </nav>
    );
}
