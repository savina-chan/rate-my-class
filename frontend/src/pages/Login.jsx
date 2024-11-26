import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', formData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
            // Cookies.set('token', response.data.token, { expires: 1 }); // Store the token
            Cookies.set('userId', response.data.userId, { expires: 1 }); // Store the user ID
            setIsLoggedIn(true);
            setMessage(response.data.message || 'Login successful!');
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
                <h2 className="text-4xl font-bold text-center mb-6 text-neutral-500">Login</h2>
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
                        className="w-full bg-violet-400 text-neutral-100 py-2 rounded-lg hover:bg-violet-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-xl text-neutral-500">
                    Don't have an account?{' '}
                    <a href="/register" className="text-violet-500 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
