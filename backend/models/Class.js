import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

// Define the Class Schema
const ClassSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Course code, e.g., "CSCI-UA 467"
    title: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // References to reviews
    averageRating: { type: Number, default: 0 },
    averageDifficulty: { type: Number, default: 0 },
    averageWorkload: { type: Number, default: 0 },
    averageLearningValue: { type: Number, default: 0 },
}, { timestamps: true });

// Add a slug based on the title for easy URL referencing
ClassSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=code%>' });

// Register the Class model with Mongoose
const Class = mongoose.model('Class', ClassSchema);

export default Class;