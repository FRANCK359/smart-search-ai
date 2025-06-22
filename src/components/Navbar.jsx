import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import {
  MoonIcon,
  SunIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">IntelliSearch</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center space-x-1 ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
              }`
            }
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Search</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
            }
          >
            News
          </NavLink>
          <NavLink
            to="/api"
            className={({ isActive }) =>
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
            }
          >
            API
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1">
                <UserIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="hidden md:inline">{user.username || user.email}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center space-x-2">
                      <Cog6ToothIcon className="h-4 w-4" />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center space-x-2">
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </Link>
              <Link
                to="/login"
                className="px-3 py-1 text-sm rounded-md text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 text-sm rounded-md bg-primary-600 text-white hover:bg-primary-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
