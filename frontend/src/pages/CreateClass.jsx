import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateClass = ({ isLoggedIn }) => {
    const [formData, setFormData] = useState({ code: '', title: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate class code format
    const validateClassCode = (code) => {
        const classCodePattern = /^[A-Z]{2,5}-[A-Z]{2,3} \d{1,4}$/; 
        // Pattern: 2–5 uppercase letters, a dash, 2–3 uppercase letters, a space, and 1–4 digits
        return classCodePattern.test(code);
    };

    // Capitalize the first letter of each word in the title
    const capitalizeTitle = (title) => {
        return title
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('You must be logged in to create a class.');
            navigate('/');
            return;
        }

        // Validate class code
        if (!validateClassCode(formData.code)) {
            alert('Class code must be in the format: ABCD-XX 123 (Subject-SchoolCode ClassCode, with uppercase letters and numbers).');
            return;
        }

        // Format the title
        const formattedData = {
            ...formData,
            title: capitalizeTitle(formData.title),
        };

        try {
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
                <h2 className="text-4xl font-bold text-center mb-6 text-neutral-500">
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
                        className="w-full bg-violet-400 text-neutral-100 py-2 rounded-lg hover:bg-violet-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateClass;
