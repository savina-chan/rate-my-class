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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('You must be logged in to create a class.');
            navigate('/');
            return;
        }
        try {
            const response = await axios.post('/api/classes', formData, {
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