import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

import {
    cardStyle,
    inputStyle,
    pageStyle,
    buttonPrimary
} from "../utils/theme";

export default function Signup() {

    const navigate = useNavigate();
    const { darkMode } = useContext(ThemeContext);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (!form.username.trim())
            temp.username = "Username is required";

        if (!form.email.trim())
            temp.email = "Email is required";

        else if (!/\S+@\S+\.\S+/.test(form.email))
            temp.email = "Invalid email";

        if (!form.password)
            temp.password = "Password is required";

        else if (form.password.length < 6)
            temp.password = "Password must be at least 6 characters";

        if (!form.confirmPassword)
            temp.confirmPassword = "Confirm your password";

        else if (form.password !== form.confirmPassword)
            temp.confirmPassword = "Passwords do not match";

        setErrors(temp);

        return Object.keys(temp).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {

            await API.post("/auth/signup", {
                username: form.username,
                email: form.email,
                password: form.password
            });

            toast.success("Registration Successful");

            navigate("/login");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Registration Failed"
            );

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
                        Create Account
                    </h2>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border mb-1 ${inputStyle(darkMode)}`}
                    />

                    <p className="text-red-500 text-sm mb-3">
                        {errors.username}
                    </p>

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

                    <p className="text-red-500 text-sm mb-3">
                        {errors.password}
                    </p>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-lg border mb-1 ${inputStyle(darkMode)}`}
                    />

                    <p className="text-red-500 text-sm mb-5">
                        {errors.confirmPassword}
                    </p>

                    <button
                        disabled={loading}
                        className={`${buttonPrimary} w-full py-3 font-semibold`}
                    >
                        {loading ? "Creating Account..." : "Signup"}
                    </button>

                    <p className="text-center mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </>
    );

}
