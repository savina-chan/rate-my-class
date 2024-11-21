import mongoose from 'mongoose';
// import mongooseSlugPlugin from 'mongoose-slug-plugin';

// Define the User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Store hashed passwords
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // References to reviews
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Register the User model with Mongoose
const User = mongoose.model('User', UserSchema);

// Add a slug based on the username for easy URL referencing
// UserSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=username%>' });

export default User;