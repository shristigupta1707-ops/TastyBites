import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";


function AddMenuItem() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Starter",
        price: "",
        availability: true
    });


    // Store selected image
    const [image, setImage] = useState(null);


    // Store temporary preview
    const [imagePreview, setImagePreview] = useState("");


    const [message, setMessage] = useState("");


    // Handle form input
    const handleChange = (e) => {

        const { name, value } = e.target;


        setFormData({
            ...formData,
            [name]:
                name === "availability"
                    ? value === "true"
                    : value
        });

    };


    // Handle image selection
    const handleImageChange = (e) => {

        const file = e.target.files[0];


        if (!file) {
            return;
        }


        setImage(file);


        // Create local preview
        setImagePreview(
            URL.createObjectURL(file)
        );

    };


    // Submit form
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const token =
                localStorage.getItem("token");


            // Create multipart form
            const data = new FormData();


            data.append(
                "name",
                formData.name
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "category",
                formData.category
            );

            data.append(
                "price",
                formData.price
            );

            data.append(
                "availability",
                formData.availability
            );


            if (image) {

                data.append(
                    "image",
                    image
                );

            }


            await api.post(
                "/menu-items",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setMessage(
                "Menu item added successfully!"
            );


            setTimeout(() => {

                navigate(
                    "/admin/menu-items"
                );

            }, 700);


        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to add menu item"
            );

        }

    };


    return (
        <div className="min-h-screen bg-sky-50">

            <Navbar />


            <div className="max-w-2xl mx-auto px-6 py-12">

                <div className="mb-8">

                    <p className="text-sky-600 font-medium text-sm uppercase tracking-wider mb-2">
                        Admin Panel
                    </p>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Add Menu Item
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Add a new delicious item to your menu
                    </p>

                </div>


                <div className="bg-white p-8 rounded-2xl shadow-md border border-sky-100">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Item Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter item name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                                required
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Describe the menu item..."
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none resize-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                                required
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                            >

                                <option value="Starter">
                                    Starter
                                </option>

                                <option value="Main Course">
                                    Main Course
                                </option>

                                <option value="Dessert">
                                    Dessert
                                </option>

                                <option value="Beverage">
                                    Beverage
                                </option>

                            </select>

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                                required
                            />

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Availability
                            </label>

                            <select
                                name="availability"
                                value={String(
                                    formData.availability
                                )}
                                onChange={handleChange}
                                className="w-full border border-slate-200 px-4 py-3 rounded-lg outline-none bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                            >

                                <option value="true">
                                    In Stock
                                </option>

                                <option value="false">
                                    Out of Stock
                                </option>

                            </select>

                        </div>


                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Item Image
                            </label>

                            <div className="border-2 border-dashed border-sky-200 rounded-xl p-5 bg-sky-50/50">

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full text-sm text-slate-500"
                                />

                                <p className="text-xs text-slate-400 mt-2">
                                    Select an image for your menu item
                                </p>

                            </div>

                        </div>


                        {/* Image preview before upload */}
                        {imagePreview && (

                            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">

                                <p className="text-sm font-medium text-slate-700 mb-3">
                                    Image Preview
                                </p>

                                <img
                                    src={imagePreview}
                                    alt="Selected preview"
                                    className="w-48 h-48 object-cover rounded-xl border border-sky-100 shadow-sm"
                                />

                            </div>

                        )}


                        <button
                            type="submit"
                            className="w-full bg-sky-500 text-white py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors duration-200"
                        >
                            Add Menu Item
                        </button>


                    </form>


                    {message && (
                        <p className="mt-5 text-center text-sky-600 bg-sky-50 border border-sky-100 p-3 rounded-lg text-sm">
                            {message}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}


export default AddMenuItem;