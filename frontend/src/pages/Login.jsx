import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

import {
    cardStyle,
    inputStyle,
    pageStyle,
    buttonPrimary
} from "../utils/theme";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
    const { darkMode } = useContext(ThemeContext);

    const [form, setForm] = useState({
        email: "",
        password: ""
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

        if (!form.email.trim())
            temp.email = "Email is required";

        else if (!/\S+@\S+\.\S+/.test(form.email))
            temp.email = "Invalid email format";

        if (!form.password)
            temp.password = "Password is required";

        setErrors(temp);

        return Object.keys(temp).length === 0;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {

            const res = await API.post("/auth/login", form);
            login(res.data.token);
            toast.success("Login Successful");
            navigate("/home");

        } catch {

            toast.error("Invalid email or password");

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />
            <div className={`min-h-screen flex justify-center items-center px-4 transition-all ${pageStyle(darkMode)}`}>

                <form
                    onSubmit={handleSubmit}
                    className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${cardStyle(darkMode)}`}
                >
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Login
                    </h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border mb-1 ${inputStyle(darkMode)}`}
                    />

                    <p className="text-red-500 text-sm mb-3">
                        {errors.email}
                    </p>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border mb-1 ${inputStyle(darkMode)}`}
                    />

                    <p className="text-red-500 text-sm mb-5">
                        {errors.password}
                    </p>

                    <button
                        disabled={loading}
                        className={`${buttonPrimary} w-full py-3 font-semibold`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center mt-6">
                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Signup
                        </Link>
                    </p>

                </form>
            </div>
        </>
    );
}