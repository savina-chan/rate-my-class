import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '../../auth';

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
    // const username = Cookies.get('username'); // Retrieve the username from cookies

    const handleLogout = () => {
        logout(); // Remove the token cookie
        setIsLoggedIn(false); // Update the login state
    };

    return (
        <div className="min-h-screen bg-stone-100 font-sans">
            {/* Header Section */}
            <header className="bg-violet-300 text-stone-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                    {/* Left Side - Logo and Title */}
                    <div className="flex items-center space-x-2">
                        <Link to="/">
                            <img
                                src="/logo.png"
                                alt="RateMyClass Logo"
                                className="h-48 w-auto"
                            />
                        </Link>
                        <Link to="/" className="text-5xl font-bold">RateMyClass</Link>
                    </div>

                    {/* Right Side - Auth Links or Greeting */}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <span className="text-sm"></span>
                                <button
                                    onClick={handleLogout}
                                    className="px-8 py-3 bg-stone-100 text-violet-400 rounded-md hover:bg-stone-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-8 py-3 bg-stone-100 text-violet-400 rounded-md hover:bg-stone-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-8 py-3 bg-stone-100 text-violet-400 rounded-md hover:bg-stone-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">{children}</main>
        </div>
    );
};

export default Layout;
