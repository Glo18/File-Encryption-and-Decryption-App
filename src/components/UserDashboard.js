// UserDashboard.js
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const UserDashboard = () => {
  const [stats, setStats] = useState({
    encrypted: 0,
    decrypted: 0,
    downloads: 0,
    success: 0,
    failed: 0,
    lastActivity: "N/A",
  });

  const [userActivities, setUserActivities] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [filterType, setFilterType] = useState("all");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUsername = currentUser?.name;

  useEffect(() => {
    const allActivities = JSON.parse(localStorage.getItem("fileActivities")) || [];
    const filteredActivities = allActivities.filter(
      (activity) => activity.user === currentUsername
    );
    const userStats = {
      encrypted: filteredActivities.filter(a => a.type === "Encrypted").length,
      decrypted: filteredActivities.filter(a => a.type === "Decrypted").length,
      downloads: filteredActivities.filter(a => a.type === "Downloaded").length,
      success: filteredActivities.filter(a => ["Encrypted", "Decrypted", "Downloaded"].includes(a.type)).length,
      failed: filteredActivities.filter(a => a.type.includes("Failed")).length,
      lastActivity: filteredActivities[0]?.timestamp || "N/A",
    };

    setStats(userStats);
    setUserActivities(filteredActivities);
  }, [currentUsername]);

  const displayedActivities = filterType === "all"
    ? userActivities
    : userActivities.filter(a => a.type === filterType);

  const barData = {
    labels: ["Encrypted", "Decrypted", "Downloads", "Success", "Failed"],
    datasets: [{
      label: "Activity Count",
      data: [stats.encrypted, stats.decrypted, stats.downloads, stats.success, stats.failed],
      backgroundColor: ["#7b2cbf", "#80ed99", "#fca311", "#5E40BE", "#d00000"]
    }]
  };

  const pieData = {
    labels: ["Encrypted", "Decrypted", "Downloads", "Success", "Failed"],
    datasets: [{
      data: [stats.encrypted, stats.decrypted, stats.downloads, stats.success, stats.failed],
      backgroundColor: ["#7b2cbf", "#80ed99", "#fca311", "#5E40BE", "#d00000"]
    }]
  };

  const lineData = {
    labels: userActivities.map(a => a.timestamp),
    datasets: [{
      label: "User Activity Timeline",
      data: userActivities.map((_, idx) => idx + 1),
      fill: false,
      borderColor: "#3c096c",
      tension: 0.3
    }]
  };

  const tips = [
    "Use strong passwords for file encryption.",
    "Avoid reusing keys across different files.",
    "Download encrypted files to secure locations.",
    "Check activity logs regularly to ensure your account wasn't misused.",
    "Clear your browser's localStorage after sensitive operations on public computers."
  ];
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="App">
      <h2>📈 User Dashboard</h2>
      <p>Welcome, <strong>{currentUsername}</strong></p>
      <p>Last Activity: <strong>{stats.lastActivity}</strong></p>
      <p style={{ fontStyle: "italic", color: "#666" }}>🔒 Tip: {tip}</p>

      <div className="container">
        <div style={{ width: "45%" }}><Bar data={barData} /></div>
        <div style={{ width: "45%" }}><Doughnut data={pieData} /></div>
      </div>

      <div style={{ width: "70%", margin: "30px auto" }}><Line data={lineData} /></div>

      <div style={{ marginTop: "20px" }}>
        <label>Filter Activities: </label>
        <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
          <option value="all">All</option>
          <option value="Encrypted">Encrypted</option>
          <option value="Decrypted">Decrypted</option>
          <option value="Downloaded">Downloaded</option>
        </select>
      </div>

      <button style={{ marginTop: "20px" }} onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "View My File Activity"}
      </button>

      {showDetails && (
        <div style={{ marginTop: "20px" }}>
          <h3>📁 My File Activities</h3>
          <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
            {displayedActivities.map((activity, idx) => (
              <li key={idx}>
                <strong>{activity.fileName}</strong> - {activity.type} at {activity.timestamp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
