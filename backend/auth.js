import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
    console.log('Cookies:', req.cookies); // Debug cookies
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.error('Token not found in cookies or headers');
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.userId = decoded.id; // Attach the user ID to the request object
        console.log('Decoded Token:', decoded);
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

export default authenticate;