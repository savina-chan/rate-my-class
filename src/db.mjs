import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

// Connect to MongoDB using the connection string from the environment variable
mongoose.connect(process.env.DSN);

// Define the User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // hashed password
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

// Add a slug based on the username for easy URL referencing
UserSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=username%>' });

// Define the Class Schema
const ClassSchema = new mongoose.Schema({
  classCode: { type: String, required: true },
  title: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  averageRating: { type: Number, default: 0 }, // aggregate rating based on submitted reviews
}, { timestamps: true });

// Add a slug based on the title for easy URL referencing
ClassSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=title%>' });

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

// Register the models with Mongoose
mongoose.model('User', UserSchema);
mongoose.model('Class', ClassSchema);
mongoose.model('Review', ReviewSchema);