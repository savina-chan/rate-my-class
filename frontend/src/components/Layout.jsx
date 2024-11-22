import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Logo Section */}
            <header>
                <Link to="/"><img src="/logo.png" alt="Logo" id='logo'/></Link>
            </header>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
};

export default Layout;