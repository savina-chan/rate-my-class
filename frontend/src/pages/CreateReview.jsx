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
        <div>
            <h2>Post a Review for {slug.toUpperCase()}</h2>
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
                <select
                    name='grade'
                    value={formData.grade}
                    onChange={handleChange}
                    required
                >
                    <option value=''>Grade</option>
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
                <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                >
                    <option value="">Rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
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
                >
                    <option value="">Difficulty</option>
                    {[1, 2, 3, 4, 5].map((num) => (
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
                >
                    <option value="">Workload</option>
                    {[1, 2, 3, 4, 5].map((num) => (
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
                >
                    <option value="">Learning Value</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
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