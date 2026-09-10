/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import MenuCard from "../components/MenuCard";
import api from "../services/api";

function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get("/api/menu-items");

        setMenuItems(response.data.data);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-sky-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Page Heading */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-white border border-sky-100 shadow-sm px-4 py-2 rounded-full mb-5">
            <span className="text-sky-500">✦</span>

            <p className="text-sky-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Fresh • Delicious • Simple
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
            Our Menu
          </h1>

          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm sm:text-base leading-7">
            Explore our delicious selection of dishes, prepared with care and
            served with love.
          </p>

          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-10 h-1 bg-sky-200 rounded-full"></div>

            <div className="w-16 h-1.5 bg-sky-400 rounded-full"></div>

            <div className="w-10 h-1 bg-sky-200 rounded-full"></div>
          </div>
        </div>

        {loading ? (
          /* Loading */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>

            <p className="text-slate-500 mt-5">Loading menu...</p>
          </div>
        ) : menuItems.length === 0 ? (
          /* Empty State */
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-md border border-sky-100 p-8 sm:p-10 text-center">
              <div className="w-20 h-20 mx-auto bg-sky-100 rounded-full flex items-center justify-center mb-5">
                <span className="text-4xl">🍽️</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                No menu items yet
              </h2>

              <p className="text-slate-500 leading-6">
                Our delicious menu will be available here soon. Please check
                back later!
              </p>
            </div>
          </div>
        ) : (
          /* Menu Items */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {menuItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
