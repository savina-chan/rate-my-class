import Cookies from 'js-cookie';

// Check if the user is authenticated by verifying the presence of the token cookie
export const isAuthenticated = () => {
    const token = Cookies.get('token'); // Retrieve the token cookie
    // console.log(token);
    return !!token; // Return true if the token exists
};

// Log out the user by removing the token cookie
export const logout = () => {
    Cookies.remove('token'); // Remove the token cookie
};

