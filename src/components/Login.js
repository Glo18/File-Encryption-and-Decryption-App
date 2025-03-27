import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find the matching user
        const matchingUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (matchingUser) {
            alert(`Welcome back, ${matchingUser.name}!`);
            localStorage.setItem("currentUser", JSON.stringify(matchingUser)); // Store session
            navigate("/"); // Redirect to home page
        } else {
            alert("Invalid email or password!");
        }
    };
        

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
};

export default Login;
