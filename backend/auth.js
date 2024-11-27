import jwt from 'jsonwebtoken';

// Middleware function to authenticate a user based on a JWT token
const authenticate = (req, res, next) => {
    // Retrieve the token from the cookies
    const token = req.cookies.token;

    // Check if the token exists in the cookies
    if (!token) {
        console.error('Token not found in cookies.');
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        // Verify the token using the secret key (stored in the environment variable)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user ID from the decoded token to the request object
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

export default authenticate;