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
import sanitize from 'mongo-sanitize';

// Load environment variables from the .env file
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

// Endpoint for user registration
app.post('/api/users/register', async (req, res) => {
    // Sanitize the incoming request data
    const username = sanitize(req.body.username);
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    // Ensure all required fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if a user with the same username or email already exists in the database
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            return res
                .status(403)
                .json({ message: 'User with this username or email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password, not the plain text
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error registering an account:', error);
        res.status(500).json({ message: 'Server error. Could not register.' });
    }
});

// Endpoint for user login
app.post('/api/users/login', async (req, res) => {
    // Sanitize the incoming request data
    const username = sanitize(req.body.username);
    const password = sanitize(req.body.password);

    // Ensure all required fields are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Find the user in the database by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT (JSON Web Token) for authentication
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Successful login
        res
            .cookie('token', token, {
                sameSite: 'strict', // Prevent CSRF
                maxAge: 24 * 60 * 60 * 1000, // Set cookie expiration to 1 day
            })
            .status(200)
            .json({ message: 'Login successful.', token, userId: user._id });

    } catch (error) {
        console.error('Error logging into account:', error);
        res.status(500).json({ message: 'Server error. Could not login.' });
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('username');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Endpoint to retrieve all classes
app.get('/api/classes', async (req, res) => {
    try {
        // Query the database to retrieve all classes
        const classes = await Class.find();
        // Send the retrieved classes in the response
        res.status(200).json(classes);
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ message: 'Server error. Could not fetch classes.' })
    }
});

// Endpoint to create a new class
app.post('/api/classes', async (req, res) => {
    try {
        // Sanitize the incoming request data
        const code = sanitize(req.body.code);
        const title = sanitize(req.body.title);

        // Ensure all required fields are provided
        if (!code || !title) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if a class with the same code or title already exists in the database
        const existingClass = await Class.findOne({
            $or: [{ code }, { title }],
        });
        if (existingClass) {
            return res.status(409).json({ message: 'Class with this code or title already exists.' });
        }

        // Create a new class document in the database
        const newClass = await Class.create({ code, title });

        res.status(201).json({
            message: 'Class created successfully.',
            data: newClass, // Send back the created class for client-side confirmation
        });
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ message: 'Server error. Could not create class.' });
    }
});

// Endpoint to retrieve class details by slug
app.get('/api/classes/:slug', async (req, res) => {
    try {
        // Sanitize the `slug` parameter
        const slug = sanitize(req.params.slug);

        // Query the database to find the class with the given slug
        const classDoc = await Class.findOne({ slug }).populate({
            path: 'reviews', // Populate the reviews field
            populate: { path: 'user', select: 'username' }, // Within each review, populate the user field and only include the username field from the user document
        });

        if (!classDoc) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        // Send the class details
        res.status(200).json(classDoc);
    } catch (error) {
        console.error('Error fetching class details:', error);
        res.status(500).json({ message: 'Server error. Could not fetch class details.' });
    }
});

// Endpoint to retrieve a specific review by ID with authentication
app.get('/api/reviews/:reviewId', authenticate, async (req, res) => {
    try {
        // Sanitize the reviewId parameter
        const reviewId = sanitize(req.params.reviewId);

        // Query the database to find the review by its ID
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        // Check if the review belongs to the authenticated user
        if (review.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized to access this review.' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'Server error. Could not fetch review.' });
    }
});

// Endpoint to add a review to a class
app.post('/api/classes/:slug/reviews', authenticate, async (req, res) => {
    try {
        // Extract and sanitize the authenticated user's ID from the request object
        const userId = sanitize(req.userId);
        // Sanitize the `slug` parameter
        const slug = sanitize(req.params.slug);

        // Sanitize the request body fields
        const {
            professor,
            semester,
            grade,
            rating,
            difficulty,
            workload,
            learningValue,
            comment
        } = sanitize(req.body);

        // Ensure all required fields are provided
        if (!professor || !semester || !grade || !rating || !difficulty || !workload || !learningValue || !comment) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find the class by its slug
        const classDoc = await Class.findOne({ slug });
        if (!classDoc) {
            return res.status(404).json({ message: 'Class not found.' });
        }

        // Create a new review with the provided data and the authenticated user's ID
        const review = await Review.create({
            user: userId, // Associate the review with the authenticated user
            class: classDoc._id, // Associate the review with the class
            professor,
            semester,
            grade,
            rating,
            difficulty,
            workload,
            learningValue,
            comment
        });

        // Add the review's ID to the class's reviews array
        classDoc.reviews.push(review._id);
        await classDoc.save();

        // Calculate new averages for the class based on all its reviews
        const reviews = await Review.find({ class: classDoc._id });
        const averages = {
            averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
            averageDifficulty: reviews.reduce((sum, r) => sum + r.difficulty, 0) / reviews.length,
            averageWorkload: reviews.reduce((sum, r) => sum + r.workload, 0) / reviews.length,
            averageLearningValue: reviews.reduce((sum, r) => sum + r.learningValue, 0) / reviews.length,
        };

        // Update the class document with the new averages
        await Class.findByIdAndUpdate(classDoc._id, averages);
        
        // Add the review's ID to the user's reviews array
        await User.findByIdAndUpdate(userId, { $push: { reviews: review._id } });
        
        res.status(201).json({ message: 'Review added successfully.', review });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error. Could not add review.' });
    }
});

// Endpoint to update a specific review by its ID
app.put('/api/reviews/:reviewId', authenticate, async (req, res) => {
    try {
        // Sanitize the `reviewId` parameter
        const reviewId = sanitize(req.params.reviewId);
        // Sanitize the updated fields in the request body
        const updatedFields = sanitize(req.body);

        // Find the review by its ID in the database
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        // Check if the review belongs to the authenticated user
        if (review.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized to update this review.' });
        }

        // Update the review fields with the data from the request body
        Object.assign(review, updatedFields);

        // Save the updated review to the database
        await review.save();

        // Retrieve the class associated with the review and its reviews
        const classDoc = await Class.findById(review.class).populate('reviews');
        const reviews = classDoc.reviews;
        // Recalculate the averages for the class based on all its reviews
        const averages = {
            averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
            averageDifficulty: reviews.reduce((sum, r) => sum + r.difficulty, 0) / reviews.length,
            averageWorkload: reviews.reduce((sum, r) => sum + r.workload, 0) / reviews.length,
            averageLearningValue: reviews.reduce((sum, r) => sum + r.learningValue, 0) / reviews.length,
        };
        // Update the class document with the new averages
        await Class.findByIdAndUpdate(review.class, averages);

        res.status(200).json({ message: 'Review updated successfully.', review });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Server error. Could not update review.' });
    }
});

// Endpoint to delete a specific review by its ID
app.delete('/api/reviews/:reviewId', authenticate, async (req, res) => {
    try {
        // Sanitize the reviewId parameter
        const reviewId = sanitize(req.params.reviewId);

        // Find the review by its ID in the database
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        // Ensure the review belongs to the authenticated user
        if (review.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this review.' });
        }

        // Remove the review's ID from the reviews array in the associated Class document
        await Class.findByIdAndUpdate(review.class, {
            $pull: { reviews: review._id },
        });

        // Remove the review's ID from the reviews array in the associated User document
        await User.findByIdAndUpdate(review.user, {
            $pull: { reviews: review._id },
        });

        // Delete the review document from the database
        await Review.findByIdAndDelete(reviewId);

        // Recalculate the averages for the associated class
        const classDoc = await Class.findById(review.class).populate('reviews');
        const reviews = classDoc.reviews;
        // Calculate new averages or reset to 0 if no reviews remain
        const averages = reviews.length > 0
            ? {
                averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
                averageDifficulty: reviews.reduce((sum, r) => sum + r.difficulty, 0) / reviews.length,
                averageWorkload: reviews.reduce((sum, r) => sum + r.workload, 0) / reviews.length,
                averageLearningValue: reviews.reduce((sum, r) => sum + r.learningValue, 0) / reviews.length,
            }
            : {
                averageRating: 0,
                averageDifficulty: 0,
                averageWorkload: 0,
                averageLearningValue: 0,
            };

        // Update the class document with the recalculated averages
        await Class.findByIdAndUpdate(review.class, averages);

        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error. Could not delete review.' });
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
    console.log(`Server running on http://${process.env.HOST ?? 'localhost'}:${PORT ?? 3000}`);
});
