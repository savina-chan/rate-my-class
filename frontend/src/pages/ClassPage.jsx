import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ClassPage = ({ isLoggedIn }) => { // Use isLoggedIn prop
    const { slug } = useParams(); // Get the class slug from the URL
    const [classData, setClassData] = useState(null); // State for class details
    const [reviews, setReviews] = useState([]); // State for reviews
    const [loading, setLoading] = useState(true); // State for loading

    // Fetch class details and reviews
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await axios.get(`/api/classes/${slug}`);
                setClassData(response.data);
                setReviews(response.data.reviews || []); // Fallback to an empty array if reviews are undefined
            } catch (error) {
                console.error('Error fetching class details:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };
        fetchClassData();
    }, [slug]);

    if (loading) {
        return <p>Loading...</p>; // Display a loading message while data is being fetched
    }

    if (!classData) {
        return <p>Class not found.</p>; // Handle case where class data is not found
    }

    return (
        <div>
            <h2>{classData.title} - {classData.code}</h2>
            <ul>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <li key={review._id}>
                            <p className="text-sm text-gray-500">
                                Posted on:{" "}
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }).format(new Date(review.createdAt))}
                            </p>
                            <p>Professor: {review.professor} | Semester: {review.semester} | Grade: {review.grade}</p>
                            <p>Rating: {review.rating} | Difficulty: {review.difficulty} | Workload: {review.workload} | Learning Value: {review.learningValue}</p>
                            <p>Comment: {review.comment}</p>
                        </li>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to post one!</p>
                )}
            </ul>
            {isLoggedIn && (
                <div>
                    <button><Link to={`/${slug}/rate`}>Post a Rating</Link></button>
                </div>
            )}
        </div>
    );
};

export default ClassPage;
