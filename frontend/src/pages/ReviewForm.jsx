// src/pages/ReviewForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the ReviewForm component
function ReviewForm() {
    // State to store form input values
    const [formData, setFormData] = useState({
        classCode: '',
        className: '',
        professor: '',
        semesterTaken: '',
        grade: '',
        rating: '',
        difficulty: '',
        workload: '',
        learningValue: '',
        comment: ''
    });
    // useNavigate hook for programmatic navigation
    const navigate = useNavigate();

    // Handle change in form inputs
    const handleChange = (e) => {
        // Update formData state with the new value of the input field
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        // Prevent page reload on form submission
        e.preventDefault();
        try {
            // Send a POST request to add a new review with form data
            await axios.post('/api/reviews', formData);
            // Navigate back to the home page upon successful submission
            navigate('/');
        } 
        catch (error) {
            console.error("Error submitting review:", error);
        }
    };
    
    // Render the form for submitting a review
    return (
        <div>
            <h1>Submit a Review</h1>
            <form onSubmit={handleSubmit}>
                <input name="classCode" placeholder="Class Code" onChange={handleChange} required />
                <input name="className" placeholder="Class Name" onChange={handleChange} required />
                <input name="professor" placeholder="Professor" onChange={handleChange} required />
                <input name="semesterTaken" placeholder="Semester Taken" onChange={handleChange} required />
                <input name="grade" placeholder="Grade" onChange={handleChange} required />
                <input name="rating" type="number" placeholder="Rating" onChange={handleChange} required />
                <input name="difficulty" type="number" placeholder="Difficulty" onChange={handleChange} required />
                <input name="workload" type="number" placeholder="Workload" onChange={handleChange} required />
                <input name="learningValue" type="number" placeholder="Learning Value" onChange={handleChange} required />
                <textarea name="comment" placeholder="Comment" onChange={handleChange} required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReviewForm;
