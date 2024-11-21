import React, { useState } from 'react';
import axios from 'axios';

// Display a registration form with username, email, and password fields
const Register = () => {
    // State to manage form input values
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // State to manage success or error messages
    const [message, setMessage] = useState('');

    // Update the formData state when input fields are changed
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Send a POST request to the backend API to register the user
            const response = await axios.post('/api/users/register', formData, { headers: { 'Content-Type': 'application/json' }, });
            setMessage(response.data.message || 'Registration successful!');
        } catch (error) {
            // Handle errors and set the error message
            setMessage(error.response.data.message || 'An error occurred.');
        }
    }

    return (
        <div>
            {/* <div></div> */}
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' value={formData.username} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor='username'>Email</label>
                    <input type='email' name='email' id='email' value={formData.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' value={formData.password} onChange={handleChange} required/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Register;