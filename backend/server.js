import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import connectDB from './db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js'; // User model
import jwt from 'jsonwebtoken';

// Load environment variables from the .env file located in the root directory
dotenv.config({ path: '../.env' });

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT ?? 3000;

// Set up __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to enable CORS
app.use(cors());

// Routes
// User registration
app.post('/api/users/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)

    // Basic validation to ensure all required fields are provided
    if (!username || !email || !password) {
        return res.status(400).json( { message: 'All fields are required.'} )
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(403).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json( {message: 'Server error.'} )
    }
})

app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;

    // Basic validation to ensure all required fields are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare provided password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Successful login
        res
            .cookie('token', token, {
                // httpOnly: true, // Ensure cookie is only accessible by the server
                sameSite: 'strict', // Prevent CSRF
                maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
            })
            .status(200)
            .json({ message: 'Login successful!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// For any other routes, serve index.html from frontend/dist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Start the server on the specified port and log the URL
app.listen(PORT ?? 3000, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
