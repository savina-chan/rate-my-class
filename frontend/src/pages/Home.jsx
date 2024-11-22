import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../auth';
import SearchBar from '../components/SearchBar';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleLogout = () => {
        logout(); // Remove the token cookie
        setIsLoggedIn(false); // Update the login state
    };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h2>Find the best classes at NYU, rated by your peers.</h2>
                    <button onClick={handleLogout}>Logout</button>
                    <div>
                    <button>
                            <Link to="/create-class">Create a Class</Link>
                    </button>
                    </div>
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
            <SearchBar />
        </div>
    );
};

export default Home;