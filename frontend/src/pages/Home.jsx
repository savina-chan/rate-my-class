import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the Home component
function Home() {
    // Initialize state to store the list of reviews
    const [reviews, setReviews] = useState([]);
    // useNavigate hook for programmatic navigation
    const navigate = useNavigate();

    // useEffect hook to fetch reviews when the component mounts
    useEffect(() => {
        fetchReviews();
    }, []);

    // Function to fetch all reviews from the backend API
    const fetchReviews = async () => {
        try {
            // Make a GET request to retrieve reviews
            const response = await axios.get('/api/reviews');
            // Set the fetched reviews to the component's state
            setReviews(response.data);
        } 
        catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };
    
    // Function to delete a review by its ID
    const deleteReview = async (id) => {
        try {
            // Send a DELETE request to the backend API to delete the review by ID
            await axios.delete(`/api/reviews/${id}`);
            // Update the state to remove the deleted review from the list
            setReviews(reviews.filter(review => review._id !== id));
        } 
        catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    // Render the component's UI
    return (
        <div>
            <h1>RateMyCSClass</h1>
            <button onClick={() => navigate('/review-form')}>Add Review</button>
            <div>
                {reviews.map(review => (
                    <div key={review._id}>
                        <h2>{review.classCode}: {review.className} with {review.professor}</h2>
                        <p>Semester: {review.semesterTaken}</p>
                        <p>Grade: {review.grade}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Difficulty: {review.difficulty}</p>
                        <p>Workload: {review.workload}</p>
                        <p>Learning Value: {review.learningValue}</p>
                        <p>Comment: {review.comment}</p>
                        <button onClick={() => deleteReview(review._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
