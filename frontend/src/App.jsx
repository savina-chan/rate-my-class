import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Home page component
import Register from "./pages/Register"; // Register page component
import Login from "./pages/Login";

// Define the main App component
function App() {
    return (
        // Router component to handle navigation between different pages
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
