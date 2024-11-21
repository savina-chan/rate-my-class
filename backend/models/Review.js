import mongoose from 'mongoose';

// Define the Review Schema
const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true }, // Reference to the Class
    professor: { type: String, required: true, trim: true },
    semester: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    difficulty: { type: Number, required: true, min: 1, max: 5 },
    workload: { type: Number, required: true, min: 1, max: 5 },
    learningValue: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
}, { timestamps: true });

// Create the Review model from the defined schema
const Review = mongoose.model('Review', ReviewSchema);

export default Review;
