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

    // Validate the professor name
    const validateProfessor = (value) => {
        // Check if the input contains at least two words
        const words = value.trim().split(/\s+/);
        return words.length >= 2;
    };

    // Capitalize the first letter of each name for the professor
    const capitalizeProfessor = (professor) => {
        return professor
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Validate the semester format
    const validateSemester = (value) => {
        const semesterPattern = /^(Fall|Winter|Spring|Summer) \d{4}$/;
        return semesterPattern.test(value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('You must be logged in to post a review.');
            navigate(`/${slug}`);
            return;
        }

        // Check professor validity
        if (!validateProfessor(formData.professor)) {
            alert('Professor name must include both a first and last name.');
            return;
        }

        // Check semester validity
        if (!validateSemester(formData.semester)) {
            alert('Semester must have a valid season (capitalized) and a 4-digit year.');
            return;
        }

        // Convert numeric fields to numbers
        const formattedData = {
            ...formData,
            professor: capitalizeProfessor(formData.professor),
            rating: Number(formData.rating),
            difficulty: Number(formData.difficulty),
            workload: Number(formData.workload),
            learningValue: Number(formData.learningValue),
        };

        try {
            // Send a POST request to the backend
            // console.log(`POST URL: /api/classes/${slug}/reviews`, formattedData);
            const response = await axios.post(`/api/classes/${slug}/reviews`, formattedData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

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
                        className="w-full bg-violet-300 text-stone-100 py-2 rounded-lg hover:ring-violet-400"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateReview;