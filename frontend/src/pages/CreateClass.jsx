import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateClass = ({ isLoggedIn }) => {
    const [formData, setFormData] = useState({ code: '', title: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
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
        <div>
            {/* <div></div> */}
            <h2>Create a Class</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' name='code' id='code' placeholder='code' value={formData.code} onChange={handleChange} required></input>
                </div>
                <div>
                <input type='text' name='title' id='title' placeholder='title' value={formData.title} onChange={handleChange} required></input>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreateClass;