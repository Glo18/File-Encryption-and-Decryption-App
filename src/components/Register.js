import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Get existing users or set an empty array
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if user already exists by email
        const userExists = existingUsers.find(user => user.email === email);
        if (userExists) {
            alert("A user with this email already exists.");
            return;
        }

        // Add new user
        const newUser = { name, email, password, role };
        existingUsers.push(newUser);

        // Save to localStorage
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Registration successful! You can now log in.");
        navigate("/home");
    };
        

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <select value={role} onChange={(e) => setRole(e.target.value)} required className="input-style">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;
