import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../auth';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleLogout = () => {
        logout(); // Remove the token cookie
        setIsLoggedIn(false); // Update the login state
    };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <p>Welcome! You are logged in.</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <button>
                        <Link to="/register">Register</Link>
                    </button>
                    <button>
                        <Link to="/login">Login</Link>
                    </button>
                </>
            )}
        </div>
    );
};

export default Home;