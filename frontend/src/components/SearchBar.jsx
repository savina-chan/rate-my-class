import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// SearchBar component provides a searchable dropdown for classes
const SearchBar = () => {
    const [search, setSearch] = useState(''); // // State for the search input
    const [classList, setClassList] = useState([]); // State to store the list of classes fetched from the API
    const [isFocused, setIsFocused] = useState(false); // State to manage the focus of the search bar (controls dropdown visibility)
    const navigate = useNavigate();

    // useEffect to fetch the list of classes from the API on component mount
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('/api/classes'); // Make a GET request to fetch the class data
                setClassList(response.data); // Update state with the fetched class list
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };
        fetchClasses(); // Call the function to fetch classes
    }, []); // Dependency array ensures this effect runs only once on mount

    // Filter the list of classes based on the user's search input
    const filteredClasses = classList.filter((cls) =>
        `${cls.code} - ${cls.title}`.toLowerCase().includes(search.toLowerCase())
    );

    // Handle navigation and UI updates when a class is selected from the dropdown
    const handleClassClick = (cls) => {
        navigate(`/${cls.slug}`); // Navigate to the URL for the selected class
        setSearch(''); // Clear the search input
        setIsFocused(false); // Collapse the dropdown
    };

    return (
        <div className="relative">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for a class"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)} // Show dropdown when input is focused
                onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Collapse dropdown after 200ms (to allow click)
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
            />

            {/* Dropdown */}
            {isFocused && (
                <ul className="absolute left-0 right-0 bg-white border border-stone-300 rounded-lg max-h-60 overflow-y-auto z-10">
                    {filteredClasses.map((cls) => (
                        <li
                            key={cls._id}
                            onClick={() => handleClassClick(cls)} // Redirect on click
                            className="px-4 py-2 hover:bg-stone-100 cursor-pointer text-stone-500"
                        >
                            {cls.code} - {cls.title}
                        </li>
                    ))}
                    {filteredClasses.length === 0 && (
                        <li className="px-4 py-2 text-stone-500">No classes found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
