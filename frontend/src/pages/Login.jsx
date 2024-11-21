import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' }); // State to manage form inputs
    const [message, setMessage] = useState(''); // State to display success/error messages

    // Handle input field changes and update the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        try {
            // Send a POST request to the login API with the form data
            const response = await axios.post('/api/users/login', formData, { headers: { 'Content-Type': 'application/json' }, });

            // Update the message state with the response message
            setMessage(response.data.message || 'Login successful!');
        } catch (error) {
            // If an error occurs, display the error message from the response or a generic error
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    }

    return (
        <div>
            {/* <div></div> */}
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' value={formData.username} onChange={handleChange} required/>
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

export default Login;