import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Nav.css';

const Nav = () => {
    return (
        <div className="nav">
            <div className="nav_items">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link> {/* Home link */}
            </div>
            <div className="nav_items">
                <Link to="/stats" style={{ textDecoration: 'none', color: 'inherit' }}>Stats</Link> {/* Stats link */}
            </div>
            <div className="nav_items">
                <Link to="/gallery" style={{ textDecoration: 'none', color: 'inherit' }}>Gallery</Link> {/* Gallery link */}
            </div>
            <div className="nav_items nav_btn">
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link> {/* Login link */}
            </div>
            <div className="nav_items nav_btn">
                <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>Signin</Link> {/* Signin link */}
            </div>
        </div>
    );
};

export default Nav;
