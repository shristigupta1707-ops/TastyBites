/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function MenuItems() {

    // Store all menu items
    const [menuItems, setMenuItems] = useState([]);


    // Store search text
    const [search, setSearch] = useState("");


    // Fetch menu items
    useEffect(() => {

        const fetchMenuItems = async () => {

            try {

                const response =
                    await api.get("/menu-items");


                setMenuItems(
                    response.data.data
                );


            } catch (error) {

                console.error(
                    "Failed to fetch menu items",
                    error
                );

            }

        };


        fetchMenuItems();

    }, []);


    // Delete menu item
    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this item?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            await api.delete(
                `/menu-items/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            // Remove deleted item
            setMenuItems((currentItems) =>
                currentItems.filter(
                    (item) => item._id !== id
                )
            );


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete menu item"
            );

        }

    };


    // Filter items based on search text
    const filteredItems =
        menuItems.filter((item) =>
            item.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );


    return (
        <div className="min-h-screen bg-sky-50">

            <Navbar />


            <div className="max-w-6xl mx-auto px-6 py-12">

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                    <div>

                        <p className="text-sky-600 font-medium text-sm uppercase tracking-wider mb-2">
                            Admin Panel
                        </p>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Menu Items
                        </h1>

                    </div>


                    <Link
                        to="/admin/menu-items/add"
                        className="bg-sky-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors duration-200 text-center"
                    >
                        + Add Menu Item
                    </Link>

                </div>


                {/* Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-sky-100 mb-6">

                    <input
                        type="text"
                        placeholder="Search menu item..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                    />

                </div>


                <div className="bg-white rounded-2xl shadow-md border border-sky-100 overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-sky-50">

                                <tr>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Image
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Name
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Category
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Price
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Availability
                                    </th>

                                    <th className="text-left p-4 text-sm font-semibold text-slate-600">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredItems.map((item) => (

                                    <tr
                                        key={item._id}
                                        className="border-t border-slate-100 hover:bg-sky-50/50 transition-colors duration-150"
                                    >

                                        <td className="p-4">

                                            {item.image ? (

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-xl border border-sky-100"
                                                />

                                            ) : (

                                                <div className="w-16 h-16 rounded-xl bg-sky-50 flex items-center justify-center text-xs text-slate-400">
                                                    No image
                                                </div>

                                            )}

                                        </td>


                                        <td className="p-4 font-medium text-slate-800">
                                            {item.name}
                                        </td>


                                        <td className="p-4">

                                            <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-sm font-medium">
                                                {item.category}
                                            </span>

                                        </td>


                                        <td className="p-4 font-semibold text-sky-600">
                                            ₹{item.price}
                                        </td>


                                        <td className="p-4">

                                            <span
                                                className={`text-sm font-medium px-3 py-1 rounded-full ${
                                                    item.availability
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-red-50 text-red-500"
                                                }`}
                                            >
                                                {item.availability
                                                    ? "In Stock"
                                                    : "Out of Stock"}
                                            </span>

                                        </td>


                                        <td className="p-4">

                                            <div className="flex gap-2">

                                                <Link
                                                    to={`/admin/menu-items/edit/${item._id}`}
                                                    className="bg-sky-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors duration-200"
                                                >
                                                    Edit
                                                </Link>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item._id
                                                        )
                                                    }
                                                    className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {filteredItems.length === 0 && (
                        <p className="text-center p-10 text-slate-500">
                            No menu items found.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}


export default MenuItems;