import React, { useState, useEffect } from "react";

const Settings = () => {
  const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
    }, []);

    if (!user) {
      return (
        <div className="App">
          <div className="settings-container">
          <h2>Settings</h2>
          <p>User not found. Please log in again.</p>
        </div>
        </div>
      );
    }

  return (
    <div className="App">
      <div className="settings-container">
      <h2>User Settings</h2>
      <p>Manage your profile here.</p>
      
      <div style={{ textAlign: "left", marginTop: "20px" }}>
        <h4>👤 Profile Information</h4>
        <ul>
          <li><strong>Username:</strong> {user.name}</li>
          <li><strong>Email:</strong> {user.email}</li>
        </ul>

        <h4>🚪 Account</h4>
        <p>Click the Logout button in the navbar to end your session securely.</p>
      </div>      
    </div>
    </div>
  );
};

export default Settings;
