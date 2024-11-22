import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateReview = ({ isLoggedIn }) => {
    const { slug } = useParams(); // Get the class slug from the URL
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        professor: '',
        semester: '',
        grade: '',
        rating: '',
        difficulty: '',
        workload: '',
        learningValue: '',
        comment: ''
    });

    // State for messages or errors
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setMessage('You must be logged in to post a review.');
            return;
        }

        // Convert numeric fields to numbers
        const formattedData = {
            ...formData,
            rating: Number(formData.rating),
            difficulty: Number(formData.difficulty),
            workload: Number(formData.workload),
            learningValue: Number(formData.learningValue),
        };

        try {
            // Send a POST request to the backend
            // console.log(`POST URL: /api/classes/${slug}/reviews`, formattedData);
            const response = await axios.post(`/api/classes/${slug}/reviews`, formData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 201) {
                // Redirect back to the class page after a successful submission
                navigate(`/${slug}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div>
            <h1>Create a Review for {slug.toUpperCase()}</h1>
            {/* {message && <p className="mb-4 text-center text-red-500">{message}</p>} */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="professor"
                    placeholder="Professor"
                    value={formData.professor}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="semester"
                    placeholder="Semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="grade"
                    placeholder="Grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="difficulty"
                    placeholder="Difficulty (1-5)"
                    min="1"
                    max="5"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="workload"
                    placeholder="Workload (1-5)"
                    min="1"
                    max="5"
                    value={formData.workload}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="learningValue"
                    placeholder="Learning Value (1-5)"
                    min="1"
                    max="5"
                    value={formData.learningValue}
                    onChange={handleChange}
                    required
                />
                <input
                    name="comment"
                    placeholder="Comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateReview;