// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ReviewForm from './pages/ReviewForm';

// Define the main App component
function App() {
    return (
        // Router component to handle navigation between different pages
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/review-form" element={<ReviewForm />} />
            </Routes>
        </Router>
    );
}

export default App;
