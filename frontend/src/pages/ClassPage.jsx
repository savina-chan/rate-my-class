import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ClassPage = ({ isLoggedIn }) => {
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
                // Sort reviews by most recent first
                const sortedReviews = response.data.reviews
                    ? response.data.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    : [];
                setReviews(sortedReviews);
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
            {/* Header */}
            <div className="text-neutral-500 py-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold"> Reviews for {classData.code} - {classData.title}</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto">
                {isLoggedIn && (
                    <div className="text-center mb-6">
                        <Link
                            to={`/${slug}/rate`}
                            className="bg-violet-400 text-neutral-100 px-8 py-3 rounded-lg hover:bg-violet-500"
                        >
                            Post a Review
                        </Link>
                    </div>
                )}

                {/* Reviews */}
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-neutral-200 rounded-lg mb-6 p-6"
                        >
                            {/* Top Row: Professor, Grade, Workload, Semester */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-lg">
                                    <p className="text-violet-500">
                                        <span className="font-bold">Professor:</span> <span className="text-neutral-600">{review.professor}</span>
                                    </p>
                                </div>
                                <p className="text-lg font-bold text-violet-500">
                                    {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }).format(new Date(review.createdAt))}
                                </p>
                            </div>

                            {/* Metrics Row */}
                            <div className="grid grid-cols-5 gap-4">
                                {/* Grade */}
                                <div className="bg-neutral-50 p-2 rounded-lg shadow-sm text-center">
                                    <p className="text-2xl text-neutral-600">{review.grade}</p>
                                    <p className="text-base font-bold text-violet-500">Grade</p>
                                </div>
                                {/* Rating */}
                                <div className="bg-neutral-50 p-2 rounded-lg shadow-sm text-center">
                                    <p className="text-2xl text-neutral-600">{review.rating}</p>
                                    <p className="text-base font-bold text-violet-500">Rating</p>
                                </div>
                                {/* Difficulty */}
                                <div className="bg-neutral-50 p-2 rounded-lg shadow-sm text-center">
                                    <p className="text-2xl text-neutral-600">{review.difficulty}</p>
                                    <p className="text-base font-bold text-violet-500">Difficulty</p>
                                </div>
                                {/* Workload */}
                                <div className="bg-neutral-50 p-2 rounded-lg shadow-sm text-center">
                                    <p className="text-2xl text-neutral-600">{review.workload}</p>
                                    <p className="text-base font-bold text-violet-500">Workload</p>
                                </div>
                                {/* Difficulty */}
                                <div className="bg-neutral-50 p-2 rounded-lg shadow-sm text-center">
                                    <p className="text-2xl text-neutral-600">{review.learningValue}</p>
                                    <p className="text-base font-bold text-violet-500">Learning Value</p>
                                </div>
                            </div>
                            {/* Comments */}
                            <p className="text-violet-500 text-lg font-bold mt-2 mb-2">
                                Comments:
                            </p>
                            <div className="bg-neutral-50 p-4 rounded-lg">
                                <p className="text-gray-800">{review.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-500">
                        No reviews yet. Be the first to post one!
                    </p>
                )}
            </div>
        </div>
    );
};

export default ClassPage;
