import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateClass from './pages/CreateClass';
import ClassPage from './pages/ClassPage';
import Layout from "./components/Layout";
import { isAuthenticated } from "../auth";
import CreateReview from './pages/CreateReview';
import EditReview from './pages/EditReview';

// Define the main App component
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check authentication status when the app loads
    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, []);

    return (
        // Router component to handle navigation between different pages
        <Router>
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <Routes>
                    <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                    <Route path="/register" element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/create-class" element={<CreateClass isLoggedIn={isLoggedIn} />} />
                    <Route path="/:slug" element={<ClassPage isLoggedIn={isLoggedIn} />} />
                    <Route path="/:slug/rate" element={<CreateReview isLoggedIn={isLoggedIn} />} />
                    <Route path="/:slug/edit-review/:reviewId" element={<EditReview isLoggedIn={isLoggedIn} />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
