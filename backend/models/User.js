import mongoose from 'mongoose';

// Define the User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Store hashed password
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // References to Review
}, { timestamps: true }); // Add createdAt and updatedAt fields

// Register the User model with Mongoose
const User = mongoose.model('User', UserSchema);

export default User;