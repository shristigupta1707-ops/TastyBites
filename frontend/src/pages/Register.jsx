import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/auth/register",
                formData
            );

            setMessage(
                "Registration successful!"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };


    return (
        <div className="min-h-screen bg-sky-50">

            <Navbar />

            <div className="max-w-md mx-auto px-6 py-12">

                <div className="bg-white p-8 rounded-2xl shadow-md border border-sky-100">

                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold text-slate-800">
                            Create Account
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Join TastyBites today
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                            />

                        </div>


                        <button
                            type="submit"
                            className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors duration-200"
                        >
                            Create Account
                        </button>

                    </form>


                    {message && (
                        <p className="text-center mt-5 text-sky-600 bg-sky-50 border border-sky-100 p-3 rounded-lg text-sm">
                            {message}
                        </p>
                    )}


                    <p className="text-center text-slate-500 mt-6 text-sm">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-sky-600 font-medium hover:text-sky-700"
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;