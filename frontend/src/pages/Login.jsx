import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Login component handles user authentication
const Login = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ username: '', password: '' }); // State to manage form inputs
    const [message, setMessage] = useState(''); // State for displaying feedback messages
    const navigate = useNavigate();

    // Handle changes in the form inputs and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Send a POST request to the login endpoint
            const response = await axios.post('/api/users/login', formData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
            // Store user ID in cookies for session tracking
            Cookies.set('userId', response.data.userId, { expires: 1 }); // Store the user ID
            // Update the logged-in state to true
            setIsLoggedIn(true);
            // Display a success message or a message from the response
            setMessage(response.data.message || 'Login successful!');
            // Navigate to the homepage if the login is successful
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 rounded-lg max-w-md w-full">
                <h2 className="text-4xl font-bold text-center mb-6 text-stone-500">Login</h2>
                {message && <p className="text-center text-lg text-red-500 mb-4">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-violet-300 text-stone-100 py-2 rounded-lg hover:bg-violet-400"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-xl text-stone-500">
                    Don't have an account?{' '}
                    <a href="/register" className="text-violet-400 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
