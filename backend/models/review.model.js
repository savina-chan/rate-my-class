import mongoose from 'mongoose';

// Define the Review Schema
const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    semesterTaken: { type: String },
    professor: { type: String },
    rating: { type: Number, required: true },
    difficulty: { type: Number, required: true },
    workload: { type: Number, required: true },
    grade: { type: String },
    timeSpentWeekly: { type: Number },
    comment: { type: String, required: true },
}, { timestamps: true });
  
// Register the Review model with Mongoose
mongoose.model('Review', ReviewSchema);