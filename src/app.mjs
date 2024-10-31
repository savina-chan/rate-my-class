import './config.mjs';
import './db.mjs';
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();

// Set view engine to Handlebars
app.set('view engine', 'hbs');

// Middleware for serving static files and parsing URL-encoded data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
}));

// Define Models
const Course = mongoose.model('Course');
const Review = mongoose.model('Review');
const User = mongoose.model('User');

// Start the server on the specified port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});
