import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file located in the root directory
dotenv.config({ path: '../.env' });

// Define the Review Schema
const ReviewSchema = new mongoose.Schema({
    // Removed for this milestone (saved for later)
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    // classCode and className are temporary until User and Class models are implemented
    classCode: { type: String, required: true },
    className: { type: String, required: true },
    professor: { type: String, required: true },
    semesterTaken: { type: String, required: true },
    grade: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    difficulty: { type: Number, required: true, min: 1, max: 5 },
    workload: { type: Number, required: true, min: 1, max: 5 },
    learningValue: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
}, { timestamps: true });

// Create the Review model from the defined schema
const Review = mongoose.model('Review', ReviewSchema);

export default Review;
