import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const ClassPage = ({ isLoggedIn }) => {
    const { slug } = useParams(); // Get the class slug from the URL
    const [classData, setClassData] = useState(null); // State for class details
    const [reviews, setReviews] = useState([]); // State for reviews
    const [loading, setLoading] = useState(true); // State for loading
    const navigate = useNavigate();

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

    const handleEdit = (reviewId) => {
        navigate(`/${slug}/edit-review/${reviewId}`); // Redirect to an edit page with the review ID
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                // Delete the review
                await axios.delete(`/api/reviews/${reviewId}`, { withCredentials: true });
    
                // Update the reviews state to remove the deleted review
                const updatedReviews = reviews.filter((review) => review._id !== reviewId);
                setReviews(updatedReviews);
    
                // Fetch the updated class data to refresh the chart
                const response = await axios.get(`/api/classes/${slug}`);
                setClassData(response.data); // Update class data to reflect new averages
    
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };
    

    if (loading) {
        return <p className="text-center text-4xl mt-4 text-neutral-500">Loading...</p>;
    }

    if (!classData) {
        return <p className="text-center text-4xl mt-4 text-neutral-500">Class not found.</p>;
    }

    // Destructure averages for the chart
    const { averageRating, averageDifficulty, averageWorkload, averageLearningValue } = classData;
    const userId = Cookies.get('userId');

    return (
        <div className="container mx-auto">
            {/* Title and Chart Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10">
                <div className="md:w-2/3 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-neutral-500 mb-4">
                        Reviews for {classData.title}
                    </h1>
                    {isLoggedIn && (
                        <Link
                            to={`/${slug}/rate`}
                            className="inline-block bg-violet-400 text-neutral-100 px-6 py-2 rounded-lg hover:bg-violet-500"
                        >
                            Post a Review
                        </Link>
                    )}
                </div>
                <div className="md:w-1/3">
                    <Bar
                        data={{
                            labels: ['Rating', 'Difficulty', 'Workload', 'Learning Value'],
                            datasets: [
                                {
                                    data: [averageRating, averageDifficulty, averageWorkload, averageLearningValue],
                                    backgroundColor: 'rgba(103, 58, 183, 0.8)', // Violet color
                                    borderRadius: 8,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            scales: {
                                x: {
                                    ticks: { font: { size: 14 } },
                                },
                                y: {
                                    min: 0,
                                    max: 5,
                                    ticks: { stepSize: 1, font: { size: 14 } },
                                },
                            },
                        }}
                        height={300}
                    />
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-neutral-200 rounded-lg mb-6 p-6"
                        >
                            {/* Top Row: Professor and Date */}
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-lg text-violet-500 font-bold">
                                    Professor: <span className="text-neutral-600 font-normal">{review.professor} | </span>
                                    Semester: <span className="text-neutral-600 font-normal">{review.semester} | </span>
                                    Grade: <span className="text-neutral-600 font-normal">{review.grade}</span>
                                </p>
                                <p className="text-lg font-bold text-violet-500">
                                    {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }).format(new Date(review.createdAt))}
                                </p>
                            </div>

                            {/* Metrics Row */}
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                {/* Rating */}
                                <div className="bg-neutral-100 p-2 rounded-lg text-center">
                                    <p className="text-2xl text-neutral-600">{review.rating}</p>
                                    <p className="text-base font-bold text-violet-500">Rating</p>
                                </div>
                                {/* Difficulty */}
                                <div className="bg-neutral-100 p-2 rounded-lg text-center">
                                    <p className="text-2xl text-neutral-600">{review.difficulty}</p>
                                    <p className="text-base font-bold text-violet-500">Difficulty</p>
                                </div>
                                {/* Workload */}
                                <div className="bg-neutral-100 p-2 rounded-lg text-center">
                                    <p className="text-2xl text-neutral-600">{review.workload}</p>
                                    <p className="text-base font-bold text-violet-500">Workload</p>
                                </div>
                                {/* Learning Value */}
                                <div className="bg-neutral-100 p-2 rounded-lg text-center">
                                    <p className="text-2xl text-neutral-600">{review.learningValue}</p>
                                    <p className="text-base font-bold text-violet-500">Learning Value</p>
                                </div>
                            </div>

                            {/* Comments */}
                            <div>
                                <p className="text-violet-500 text-lg font-bold mb-2">Comments:</p>
                                <div className="bg-neutral-100 p-4 rounded-lg">
                                    <p className="text-neutral-600">{review.comment}</p>
                                </div>
                            </div>

                            {/* Edit and Delete Buttons */}
                            {review.user && review.user._id === userId && (
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        onClick={() => handleEdit(review._id)}
                                        className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="bg-rose-400 text-white px-4 py-2 rounded-lg hover:bg-rose-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
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
