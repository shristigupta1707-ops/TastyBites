import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function Dashboard() {

    // Store dashboard statistics
    const [stats, setStats] = useState({
        totalMenuItems: 0,
        totalUsers: 0,
        totalOrders: 0
    });


    // Fetch dashboard statistics
    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                const response = await api.get(
                    "/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                setStats(response.data.data);

            } catch (error) {

                console.error(
                    "Failed to fetch dashboard",
                    error
                );

            }

        };


        fetchDashboard();

    }, []);


    return (
        <div className="min-h-screen bg-sky-50">

            <Navbar />


            <div className="max-w-6xl mx-auto px-6 py-12">

                <div className="mb-10">

                    <p className="text-sky-600 font-medium text-sm uppercase tracking-wider mb-2">
                        TastyBites Admin
                    </p>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Admin Dashboard
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Overview of your restaurant management system
                    </p>

                </div>


                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-sky-100 hover:shadow-lg transition-shadow duration-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-slate-500 text-sm font-medium">
                                    Total Menu Items
                                </h2>

                                <p className="text-3xl font-bold text-slate-800 mt-3">
                                    {stats.totalMenuItems}
                                </p>

                            </div>

                            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">
                                    🍽️
                                </span>
                            </div>

                        </div>

                    </div>


                    <div className="bg-white p-6 rounded-2xl shadow-md border border-sky-100 hover:shadow-lg transition-shadow duration-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-slate-500 text-sm font-medium">
                                    Total Users
                                </h2>

                                <p className="text-3xl font-bold text-slate-800 mt-3">
                                    {stats.totalUsers}
                                </p>

                            </div>

                            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">
                                    👥
                                </span>
                            </div>

                        </div>

                    </div>


                    <div className="bg-white p-6 rounded-2xl shadow-md border border-sky-100 hover:shadow-lg transition-shadow duration-200">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-slate-500 text-sm font-medium">
                                    Total Orders
                                </h2>

                                <p className="text-3xl font-bold text-slate-800 mt-3">
                                    {stats.totalOrders}
                                </p>

                            </div>

                            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">
                                    📦
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}


export default Dashboard;