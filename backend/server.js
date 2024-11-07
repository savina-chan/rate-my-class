import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import Review from './models/Review.js';
import dotenv from 'dotenv';

// Load environment variables from the .env file located in the root directory
dotenv.config({ path: '../.env' });

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to enable CORS
app.use(cors());

/* Routes */

// Route to fetch all reviews
app.get('/api/reviews', async (req, res) => {
    try {
        // Fetch all reviews from the database
        const reviews = await Review.find();
        // Send the reviews as a JSON response
        res.json(reviews);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching reviews' });
    }
});

// Route to create a new review
app.post('/api/reviews', async (req, res) => {
    // Destructure the required fields from the request body
    const { classCode, className, professor, semesterTaken, grade, rating, difficulty, workload, learningValue, comment } = req.body;
    try {
        // Create a new Review instance with the data from the request
        const newReview = new Review({ classCode, className, professor, semesterTaken, grade, rating, difficulty, workload, learningValue, comment });
        // Save the new review to the database
        const savedReview = await newReview.save();
        // Send the saved review as a JSON response with a 201 status
        res.status(201).json(savedReview);
    } 
    catch (error) {
        res.status(400).json({ message: 'Error creating review' });
    }
});

// Route to delete a review by its ID
app.delete('/api/reviews/:id', async (req, res) => {
    try {
        // Find the review by its ID parameter
        const review = await Review.findById(req.params.id);
        // if (!review) {
        //     return res.status(404).json({ message: 'Review not found' });
        // }
        const removedReview = await Review.deleteOne(review);
        res.json({ removedReview });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error deleting review' });
    }
});

// Start the server on the specified port and log the URL
app.listen(PORT ?? 3000, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
