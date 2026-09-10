import {
    useContext,
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    AuthContext
} from "../context/AuthContext";


function Login() {

    const navigate = useNavigate();


    // Get login function from context
    const {
        login
    } = useContext(AuthContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    // Handle login
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const user = await login(
                email,
                password
            );


            // Admin goes to dashboard
            if (user.role === "Admin") {

                navigate(
                    "/admin/dashboard"
                );

            } else {

                // Normal user goes to Home
                navigate("/");

            }


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

                        <h1 className="text-3xl font-bold text-slate-800">
                            Welcome Back
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Login to your TastyBites account
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
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
                            Login
                        </button>

                    </form>


                    {message && (
                        <p className="text-red-500 text-sm text-center mt-5 bg-red-50 p-3 rounded-lg">
                            {message}
                        </p>
                    )}


                    <p className="text-center text-slate-500 mt-6 text-sm">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-sky-600 font-medium hover:text-sky-700"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}


export default Login;