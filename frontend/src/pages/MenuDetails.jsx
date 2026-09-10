import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

function MenuDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await api.get(`/api/menu-items/${id}`);

        setItem(response.data.data);
      } catch (error) {
        console.error("Failed to fetch menu item", error);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen bg-sky-50">
        <Navbar />

        <div className="flex justify-center items-center py-20">
          <p className="text-slate-500 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-sky-100 overflow-hidden">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-80 object-cover"
            />
          )}

          <div className="p-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold text-slate-800">{item.name}</h1>

              <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                {item.category}
              </span>
            </div>

            <p className="text-slate-500 mt-5 leading-7">{item.description}</p>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Price</p>

                  <p className="text-sky-600 font-bold text-2xl mt-1">
                    ₹{item.price}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-400">Availability</p>

                  <p
                    className={`font-medium mt-1 ${
                      item.availability ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.availability ? "● In Stock" : "● Out of Stock"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/"
              className="inline-block mt-8 bg-sky-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors duration-200"
            >
              ← Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuDetails;
