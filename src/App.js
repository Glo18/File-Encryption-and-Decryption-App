import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import EncryptForm from "./components/EncryptForm";
import DecryptForm from "./components/DecryptForm";
import EncryptionSettings from "./components/EncryptionSettings";
import FileUpload from "./components/FileUpload";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Settings from "./components/Settings";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import './App.css';

function App() {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Check local storage for authentication status on mount
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        setIsAuthenticated(true);
    }
}, []);

// Function to handle logout
const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
};

  return (
    <Router>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>

                {/* ========= PUBLIC ROUTES ========= */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/" element={!isAuthenticated ? <Register setAuth={setIsAuthenticated} /> : <Home />} />

                {/* Redirect authenticated users away from login/register */}
                <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/" />} />
                <Route path="/register" element={!isAuthenticated ? <Register setAuth={setIsAuthenticated} /> : <Navigate to="/" />} />

                {/* ========= PROTECTED ROUTES ========= */}

                {/* Encryption Routes – protected */}
                <Route path="/encrypt" element={isAuthenticated ? <EncryptForm /> : <Navigate to="/login" />} />
                <Route path="/decrypt" element={isAuthenticated ? <DecryptForm /> : <Navigate to="/login" />} />
                <Route path="/upload"  element={isAuthenticated ? <FileUpload /> : <Navigate to="/login" />}  />
                <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
                <Route path="/encryption-settings" element={isAuthenticated ? <EncryptionSettings /> : <Navigate to="/login" />} />
                <Route path="/admin-dashboard" element={isAuthenticated && currentUser?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
                <Route path="/user-dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} />


            </Routes>
            <Footer />
        </Router>
  );
}

export default App;
