/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function Users() {

    // Store users
    const [users, setUsers] = useState([]);


    // Fetch users
    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const token =
                    localStorage.getItem("token");


                const response =
                    await api.get(
                        "/api/users",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );


                setUsers(
                    response.data.data
                );


            } catch (error) {

                console.error(
                    "Failed to fetch users",
                    error
                );

            }

        };


        fetchUsers();

    }, []);


    // Delete user
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await api.delete(
                `/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            // Remove deleted user
            setUsers((currentUsers) =>
                currentUsers.filter(
                    (user) => user._id !== id
                )
            );


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        }

    };


    return (
        <div className="min-h-screen bg-sky-50">

            <Navbar />


            <div className="max-w-6xl mx-auto px-6 py-12">

                <div className="mb-8">

                    <p className="text-sky-600 font-medium text-sm uppercase tracking-wider mb-2">
                        Admin Panel
                    </p>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Users
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage registered TastyBites users
                    </p>

                </div>


                <div className="bg-white rounded-2xl shadow-md border border-sky-100 overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-sky-50">

                                <tr>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Name
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Email
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Role
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Registration Date
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="border-t border-slate-100 hover:bg-sky-50/50 transition-colors duration-150"
                                    >

                                        <td className="p-4 font-medium text-slate-800">
                                            {user.name}
                                        </td>


                                        <td className="p-4 text-slate-600">
                                            {user.email}
                                        </td>


                                        <td className="p-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    user.role === "Admin"
                                                        ? "bg-sky-100 text-sky-700"
                                                        : "bg-slate-100 text-slate-600"
                                                }`}
                                            >
                                                {user.role}
                                            </span>

                                        </td>


                                        <td className="p-4 text-slate-600">
                                            {new Date(
                                                user.createdAt
                                            ).toLocaleDateString()}
                                        </td>


                                        <td className="p-4">

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        user._id
                                                    )
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {users.length === 0 && (
                        <p className="text-center p-10 text-slate-500">
                            No users found.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}


export default Users;