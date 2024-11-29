import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// EditReview component allows logged-in users to edit an existing review
const EditReview = ({ isLoggedIn }) => {
    const { slug, reviewId } = useParams(); // Extract class slug and review ID from the URL parameters
    const navigate = useNavigate();

    // State to manage the form inputs
    const [formData, setFormData] = useState({
        professor: '',
        semester: '',
        grade: '',
        rating: '',
        difficulty: '',
        workload: '',
        learningValue: '',
        comment: '',
    });

    const [message, setMessage] = useState(''); // State for storing feedback or error messages

    // Fetch the review data
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`/api/reviews/${reviewId}`, { withCredentials: true });
                setFormData(response.data); // Populate the form with the existing review data
            } catch (error) {
                console.error('Error fetching review:', error);
                setMessage('Failed to load review.');
            }
        };
        fetchReview();
    }, [reviewId]); // Dependency array ensures this runs when the review ID changes

    // Handle changes to form inputs and update state
    const handleChange = (e) => {
        const { name, value } = e.target; // Get input name and value
        setFormData({ ...formData, [name]: value }); // Update the specific input in the state
    };

    // Validate the professor's name to ensure it includes at least two words
    const validateProfessor = (value) => {
        const words = value.trim().split(/\s+/); // Split input by whitespace
        return words.length >= 2; // Ensure at least two words
    };

    // Capitalize the first letter of each word in the professor's name
    const capitalizeProfessor = (professor) => {
        return professor
            .split(/\s+/) // Split input by whitespace
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' '); // Rejoin words with a space
    };

    // Capitalize the semester's season
    const capitalizeSemester = (semester) => {
        return semester.charAt(0).toUpperCase() + semester.slice(1).toLowerCase();
    };

    // Validate the semester format
    const validateSemester = (value) => {
        const semesterPattern = /^(Fall|Winter|Spring|Summer) \d{4}$/;
        return semesterPattern.test(capitalizeSemester(value));
    };

    // Handle form submission to update the review
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Redirect user to the class page if they are not logged in
        if (!isLoggedIn) {
            alert('You must be logged in to edit a review.');
            navigate(`/${slug}`); // Redirect to the class page
            return;
        }

        // Check if the professor's name is valid
        if (!validateProfessor(formData.professor)) {
            setMessage('Professor name must include both a first and last name.');
            return;
        }

        // Check if the semester format is valid
        if (!validateSemester(formData.semester)) {
            setMessage('Semester must have a valid season and a 4-digit year.');
            return;
        }

        // Format the data before submitting
        const formattedData = {
            ...formData,
            professor: capitalizeProfessor(formData.professor), // Capitalize the professor's name
            semester: capitalizeSemester(formData.semester), // Capitalize the semester's season
            rating: Number(formData.rating), // Convert string input to numbers
            difficulty: Number(formData.difficulty),
            workload: Number(formData.workload),
            learningValue: Number(formData.learningValue),
        };

        try {
            // Send the PUT request to the backend to update the review
            const response = await axios.put(`/api/reviews/${reviewId}`, formattedData, { withCredentials: true });

            if (response.status === 200) {
                navigate(`/${slug}`); // Redirect back to the class page after a successful update
            }
        } catch (error) {
            console.error('Error updating review:', error);
            setMessage('Failed to update review.');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 rounded-lg max-w-3xl w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-stone-500">
                    Edit Your Review for {slug.toUpperCase()}
                </h2>
                {message && (
                    <p className="text-center text-red-500 mb-4">{message}</p>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Top Row: Professor, Semester, Grade */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            name="professor"
                            placeholder="Professor"
                            value={formData.professor}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        />
                        <input
                            type="text"
                            name="semester"
                            placeholder="Semester"
                            value={formData.semester}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        />
                        <select
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        >
                            <option value="">Grade</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                            <option value="N/A">N/A</option>
                        </select>
                    </div>

                    {/* Second Row: Rating, Difficulty, Workload, Learning Value */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        >
                            <option value="">Rating</option>
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        >
                            <option value="">Difficulty</option>
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <select
                            name="workload"
                            value={formData.workload}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        >
                            <option value="">Workload</option>
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                        <select
                            name="learningValue"
                            value={formData.learningValue}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        >
                            <option value="">Learning Value</option>
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Comments */}
                    <div className="mb-4">
                        <textarea
                            name="comment"
                            placeholder="Comments"
                            value={formData.comment}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-violet-300 text-stone-100 py-2 rounded-lg hover:bg-violet-400"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditReview;
