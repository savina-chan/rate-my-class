import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import connectDB from './db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import Class from './models/Class.js';
import Review from './models/Review.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import authenticate from './auth.js';

// Load environment variables from the .env file located in the root directory
dotenv.config();

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

app.use(cookieParser());


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

app.get('/api/classes', async (req, res) => {
    try {
        const classes = await Class.find(); // Retrieve all classes from the database
        res.status(200).json(classes);
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ message: 'Server error. Could not fetch classes.' })
    }
});

app.post('/api/classes', async (req, res) => {
    try {
        const { code, title } = req.body;

        // Validate required fields
        if (!code || !title) {
            return res.status(400).json({ message: 'Code and title are required.' });
        }

        // Check for duplicates
        const existingClass = await Class.findOne({ code });
        if (existingClass) {
            return res.status(409).json({ message: 'Class with this code already exists.' });
        }

        // Create the new class document
        const newClass = await Class.create({ code, title });

        res.status(201).json({
            message: 'Class created successfully.',
            data: newClass,
        });
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// GET endpoint to fetch class details by slug
app.get('/api/classes/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        // Find the class by slug
        const classDoc = await Class.findOne({ slug }).populate({
            path: 'reviews',
            populate: { path: 'user', select: 'username' } // Populate reviews with user details (e.g., username)
        });

        if (!classDoc) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        res.status(200).json(classDoc); // Send the class details
    } catch (error) {
        console.error('Error fetching class details:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

app.post('/api/classes/:slug/reviews', authenticate, async (req, res) => {
    // console.log('Request Received:', req.cookies) // Debug log
    try {
        const userId = req.userId;
        // console.log(userId)
        const { slug } = req.params;
        const { professor, semester, grade, rating, difficulty, workload, learningValue, comment} = req.body;
        console.log('Request Data:', { professor, semester, grade, rating, difficulty, workload, learningValue, comment });

        // Validate required fields
        if (!professor || !semester || !grade || !rating || !difficulty || !workload || !learningValue || !comment) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find the class by slug
        const classDoc = await Class.findOne({ slug });
        if (!classDoc) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        // Create the review
        const review = await Review.create({
            user: userId, // Use the user ID from the token
            class: classDoc._id,
            professor,
            semester,
            grade, 
            rating,
            difficulty,
            workload,
            learningValue,
            comment
        });

        // Add the review to the class
        classDoc.reviews.push(review._id);
        await classDoc.save();

        // Add the review to the user's reviews array
        await User.findByIdAndUpdate(userId, { $push: {reviews: review._id } });
        
        res.status(201).json({ message: 'Review added successfully.', review });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
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
