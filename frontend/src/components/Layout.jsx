import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../auth';
import Cookies from 'js-cookie';

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
    const [username, setUsername] = useState('');

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    useEffect(() => {
        const fetchUsername = async () => {
            const userId = Cookies.get('userId'); // Retrieve the userId from the cookie
            if (userId) {
                try {
                    const response = await fetch(`/api/user/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUsername(capitalizeFirstLetter(data.username));
                    } else {
                        console.error('Failed to fetch username:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching username:', error);
                }
            }
        };

        if (isLoggedIn) {
            fetchUsername();
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        logout(); // Remove the token cookie
        setIsLoggedIn(false); // Update the login state
        setUsername(''); // Clear the username
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

                    {/* Right Side - Auth Links */}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <span className="text-stone-100 text-2xl">{`Hello, ${username}!`}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-8 py-3 bg-stone-100 text-violet-300 rounded-md hover:bg-stone-200 text-xl"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-8 py-3 bg-stone-100 text-violet-300 rounded-md hover:bg-stone-200 text-xl"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-8 py-3 bg-stone-100 text-violet-300 rounded-md hover:bg-stone-200 text-xl"
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
