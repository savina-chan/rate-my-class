import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import SearchBar from '../components/SearchBar';

const Home = ({ isLoggedIn }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-bold mb-4 text-stone-500">
                Find the best classes at NYU, rated by your peers.
            </h2>
            <div className="w-3/4 sm:w-1/2">
                <SearchBar />
            </div>
            {isLoggedIn ? (
                <div className="mt-6 flex flex-col items-center space-y-4">
                    {/* Create a Class button */}
                    <button className="px-8 py-3 text-xl bg-violet-300 text-stone-100 rounded-lg hover:bg-violet-400">
                        <Link to="/create-class">Create a Class</Link>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Home;
