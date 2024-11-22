import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ( {setIsLoggedIn} ) => {
    const [formData, setFormData] = useState({ username: '', password: '' }); // State to manage form inputs
    const [message, setMessage] = useState(''); // State to display success/error messages
    const navigate = useNavigate();

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
            const response = await axios.post('/api/users/login', formData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
            // console.log(response);
            // Cookies.set('token', response.data.token, { expires: 1 }); // Store the token as a cookie
            setIsLoggedIn(true); // Update login state
            // Update the message state with the response message
            setMessage(response.data.message || 'Login successful!');

            // Redirect to the home page if login is successful
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.log(error)
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
                    {/* <label htmlFor='username'>Username</label> */}
                    <input type='text' name='username' id='username' placeholder='username' value={formData.username} onChange={handleChange} required/>
                </div>
                <div>
                    {/* <label htmlFor='password'>Password</label> */}
                    <input type='password' name='password' id='password' placeholder='password' value={formData.password} onChange={handleChange} required/>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Login;