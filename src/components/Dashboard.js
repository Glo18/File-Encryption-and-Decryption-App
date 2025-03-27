import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="App">
      <h2>Welcome, {user?.name || "User"}!</h2>
      <p>Select an action below to get started:</p>

      <div className="container">
        <button onClick={() => navigate("/encrypt")}>🔐 Encrypt File/Text</button>
        <button onClick={() => navigate("/decrypt")}>🔓 Decrypt File/Text</button>
        <button onClick={() => navigate("/upload")}>📁 Upload File</button>
        <button onClick={() => navigate("/settings")}>⚙️ Settings</button>
      </div>
    </div>
  );
};

export default Dashboard;
