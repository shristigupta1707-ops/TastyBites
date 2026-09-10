import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-sky-100 shadow-sm sticky top-0 z-50">
      
      <div className="w-full px-6 sm:px-8 lg:px-10 py-4">
        
        <div className="flex items-center justify-between w-full">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-extrabold text-sky-600 tracking-tight"
          >
            TastyBites
          </Link>


          {/* Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium">

            {/* Home */}
            <Link
              to="/"
              className="text-slate-600 hover:text-sky-600 transition-colors duration-200"
            >
              Home
            </Link>


            {/* Logged Out */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-sky-600 transition-colors duration-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="text-slate-600 hover:text-sky-600 transition-colors duration-200"
                >
                  Register
                </Link>

                <Link
                  to="/admin-login"
                  className="text-slate-600 hover:text-sky-600 transition-colors duration-200"
                >
                  Admin
                </Link>
              </>
            )}


            {/* Normal User */}
            {user && user.role === "User" && (
              <>
                <span className="hidden sm:block text-slate-500">
                  Hi, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 hover:shadow-md transition-all duration-200"
                >
                  Logout
                </button>
              </>
            )}


            {/* Admin */}
            {user && user.role === "Admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-slate-600 hover:text-sky-600 transition-colors duration-200"
                >
                  Dashboard
                </Link>

                <Link
                  to="/admin/menu-items"
                  className="text-slate-600 hover:text-sky-600 transition-colors duration-200"
                >
                  Menu
                </Link>

                <Link
                  to="/admin/users"
                  className="text-slate-600 hover:text-sky-600 transition-colors duration-200"
                >
                  Users
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 hover:shadow-md transition-all duration-200"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;