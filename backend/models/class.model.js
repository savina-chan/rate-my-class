import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

// Define the Class Schema
const ClassSchema = new mongoose.Schema({
    classCode: { type: String, required: true },
    title: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    averageRating: { type: Number, default: 0 }, // aggregate rating based on submitted reviews
}, { timestamps: true });

// Register the Class model with Mongoose
const Class = mongoose.model('Class', ClassSchema);

// Add a slug based on the title for easy URL referencing
ClassSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' });

export default Class;