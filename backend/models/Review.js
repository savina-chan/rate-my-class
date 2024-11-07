import mongoose from 'mongoose';

// Define the Review Schema
const ReviewSchema = new mongoose.Schema({
    // SAVED FOR FUTURE MILESTONE
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    // classCode and className ARE TEMPORARY (UNTIL USER AND REVIEW SCHEMAS ARE IMPLEMENTED)
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
