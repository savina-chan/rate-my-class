import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// CreateReview component allows logged-in users to post a review for a class
const CreateReview = ({ isLoggedIn }) => {
    const { slug } = useParams(); // Extract the class slug from the URL parameters
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
        comment: ''
    });

    // State for storing messages or errors to display to the user
    const [message, setMessage] = useState('');

    // Handle input changes and update the form state dynamically
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value}); // Update the specific input in the state
    };

    // Validate the professor's name to ensure it includes at least two words
    const validateProfessor = (value) => {
        const words = value.trim().split(/\s+/); // Split input by whitespace
        return words.length >= 2; // Ensure at least two words
    };

    // Capitalize the first letter of each name for the professor's input
    const capitalizeProfessor = (professor) => {
        return professor
            .split(/\s+/) // Split by whitespace
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
            .join(' '); // Join back into a single string
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

    // Handle form submission for creating a review
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Redirect user to the class page if they are not logged in
        if (!isLoggedIn) {
            alert('You must be logged in to post a review.');
            navigate(`/${slug}`);
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
            // Send the POST request to the backend to create a new review
            const response = await axios.post(`/api/classes/${slug}/reviews`, formattedData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.status === 201) {
                // Navigate back to the class page after a successful submission
                navigate(`/${slug}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setMessage(error.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="p-8 rounded-lg max-w-3xl w-full">
                <h2 className="text-3xl font-bold text-center mb-6 text-stone-500">
                    Create a Review for {slug.toUpperCase()}
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
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;