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
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import InovLogo from '../assets/Inov.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md relative z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo et nom */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img 
            src={InovLogo} 
            alt="InovGenius Logo" 
            className="h-10 w-10 rounded-full object-cover transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            InovGenius
          </span>
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-gray-700'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`
            }
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Search</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-gray-700'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-gray-700'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`
            }
          >
            News
          </NavLink>
          <NavLink
            to="/api"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-gray-700'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`
            }
          >
            API
          </NavLink>
        </div>

        {/* Contrôles utilisateur */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-gray-600 flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="hidden md:inline text-gray-600 dark:text-gray-300">{user.username || user.email}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10 border border-gray-100 dark:border-gray-700">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3"
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-colors shadow-md"
              >
                Register
              </Link>
            </div>
          )}

          {/* Bouton menu mobile */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Search</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              News
            </NavLink>
            <NavLink
              to="/api"
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              API
            </NavLink>

            {!user && (
              <div className="flex flex-col space-y-3 pt-2">
                <Link
                  to="/login"
                  className="px-4 py-3 rounded-lg text-center text-primary-600 dark:text-primary-400 hover:bg-blue-50 dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-3 rounded-lg text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;