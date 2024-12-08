import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const { Search } = Input;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSearch = (value) => {
    navigate(`/products?search=${value}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          ClothesShop
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : "text-gray-600"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "text-blue-600" : "text-gray-600"
                }
              >
                Products
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600" : "text-gray-600"
                    }
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-gray-600">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600" : "text-gray-600"
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <Search
          placeholder="Search products"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
      </div>
    </header>
  );
};

export default Header;
