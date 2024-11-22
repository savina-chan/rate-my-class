import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
    const [search, setSearch] = useState(''); // State for search input
    const [classList, setClassList] = useState([]); // State for the list of classes
    const navigate = useNavigate();

    // Fetch classes from the backend
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('/api/classes'); // Fetch classes from the API
                setClassList(response.data); // Update the class list state
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };
        fetchClasses();
    }, []);

    // Filter the list of classes based on the search input
    const filteredClasses = classList.filter((cls) =>
        `${cls.code} - ${cls.title}`.toLowerCase().includes(search.toLowerCase())
    );

    // Handle navigation when a class is clicked
    const handleClassClick = (cls) => {
        navigate(`/${cls.slug}`); // Use the slug directly for navigation
    };

    return (
        <div>
            <input type='text' placeholder='Search for a class' value={search} onChange={(e) => setSearch(e.target.value)}/>
            {search && (
                <ul>
                    {filteredClasses.map((cls) => (
                        <li
                            key={cls._id}
                            onClick={() => handleClassClick(cls)} // Redirect on click
                        >
                            {cls.code} - {cls.title}
                        </li>
                    ))}
                    {/* {filteredClasses.length === 0 && (
                        <li className="px-4 py-2 text-gray-500">No classes found</li>
                    )} */}
                </ul>
            )}
        </div>
    )
};

export default SearchBar;