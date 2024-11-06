import mongoose from 'mongoose';

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDB');
  } 
  catch (error) {
    console.error('MongoDB connection error:', error);
    // Exit the process with a failure code (1) to indicate that the connection failed
    process.exit(1);
  }
};

export default connectDB;