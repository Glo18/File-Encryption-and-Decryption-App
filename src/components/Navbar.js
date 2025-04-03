import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    return (
        <nav className="navbar">
            <h1>File Encryption & Decryption App</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/contact">Contact</Link></li>

                {isAuthenticated && currentUser?.role === "admin" && (
                    <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                )}
                {isAuthenticated && currentUser?.role === "user" && (
                    <li><Link to="/user-dashboard">User Dashboard</Link></li>
                    )}

                {/* Show logout if user IS authenticated */}
                {isAuthenticated && (
                    <li>
                        <button onClick={onLogout} className="logout-btn">Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
