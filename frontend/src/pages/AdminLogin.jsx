import {
    useContext,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    AuthContext
} from "../context/AuthContext";


function AdminLogin() {

    const navigate = useNavigate();


    // Get login and logout functions
    const {
        login,
        logout
    } = useContext(AuthContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    // Handle Admin login
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const user = await login(
                email,
                password
            );


            // Check Admin role
            if (user.role !== "Admin") {

                // Remove the User session
                logout();

                setMessage(
                    "This account is not an Admin"
                );

                return;
            }


            // Admin successfully logged in
            navigate(
                "/admin/dashboard"
            );


        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Login failed"
            );

        }
    };


    return (
        <div className="min-h-screen bg-sky-50">

            <Navbar />


            <div className="max-w-md mx-auto px-6 py-14">

                <div className="bg-white p-8 rounded-2xl shadow-md border border-sky-100">

                    <div className="text-center mb-8">

                        <div className="w-14 h-14 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">
                                🔐
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Admin Login
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Sign in to access the admin dashboard
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Admin Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter admin email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                                required
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors duration-200"
                        >
                            Admin Login
                        </button>

                    </form>


                    {message && (
                        <p className="text-red-500 text-sm text-center mt-5 bg-red-50 border border-red-100 p-3 rounded-lg">
                            {message}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}


export default AdminLogin;