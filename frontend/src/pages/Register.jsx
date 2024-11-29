import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Register component allows new users to create an account
const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' }); // State to manage form input values
    const [message, setMessage] = useState(''); // State to manage success or error messages
    const navigate = useNavigate();

    // Update the formData state when input fields change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    // Handle form submission to register a new user
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default browser behavior on form submission
        
        try {
            // Send a POST request to the backend to register the user
            const response = await axios.post('/api/users/register', formData, { headers: { 'Content-Type': 'application/json' } });
            setMessage(response.data.message || 'Registration successful!');

            // Redirect to the home page if the registration is successful
            if (response.status === 201) {
                navigate('/');
            }
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred.');
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 rounded-lg max-w-md w-full">
                <h2 className="text-4xl font-bold text-center mb-6 text-stone-500">Register</h2>
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
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
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
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-xl text-stone-500">
                    Already have an account?{' '}
                    <a href="/login" className="text-violet-400 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;