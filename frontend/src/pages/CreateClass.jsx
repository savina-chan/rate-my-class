import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// CreateClass component provides a form for logged-in users to create a new class
const CreateClass = ({ isLoggedIn }) => {
    const [formData, setFormData] = useState({ code: '', title: '' }); // State to manage the form input values
    const [message, setMessage] = useState(''); // State to display a success or error message to the user
    const navigate = useNavigate();

    // Handle changes to form inputs and update the corresponding state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Dynamically update the field being edited
    };

    // validate the class code format using a regex pattern
    const validateClassCode = (code) => {
        const classCodePattern = /^[A-Z]{2,5}-[A-Z]{2,3} \d{1,4}$/; 
        // Pattern: 2–5 uppercase letters, a dash, 2–3 uppercase letters, a space, and 1–4 digits
        return classCodePattern.test(code.toUpperCase());
    };

    // Capitalize the first letter of each word in the class title
    const capitalizeTitle = (title) => {
        return title
            .split(/\s+/) // Split the title into words by whitespace
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' '); // Join the words back into a single string
    };

    // Handle form submission for creating a class
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Redirect to home if the user is not logged in
        if (!isLoggedIn) {
            alert('You must be logged in to create a class.');
            navigate('/');
            return;
        }

        // Validate the class code format
        if (!validateClassCode(formData.code)) {
            setMessage('Class code must be in the format: ABCD-XX 123 (Subject-SchoolCode ClassCode).');
            return;
        }

        // Format the title by capitalizing each word
        const formattedData = {
            ...formData,
            code: formData.code.toUpperCase(),
            title: capitalizeTitle(formData.title),
        };

        try {
            // Send a POST request to the API to create the class
            const response = await axios.post('/api/classes', formattedData, {
                headers: { 'Content-Type': 'application/json' }
            });
            setMessage(response.data.message || 'Class created successfully!');
            navigate('/'); // Redirect back to home after success
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 rounded-lg max-w-md w-full">
                <h2 className="text-4xl font-bold text-center mb-6 text-stone-500">
                    Create a Class
                </h2>
                {message && (
                    <p className="text-center text-red-500 mb-4">
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="code"
                            placeholder="Code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-violet-300 text-stone-100 py-2 rounded-lg hover:bg-violet-400"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateClass;
