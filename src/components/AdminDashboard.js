import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    encrypted: 0,
    decrypted: 0,
    downloads: 0,
    success: 0,
    lastActivity: "Not available",
  });

  const [fileActivities, setFileActivities] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch updated stats & file activities from localStorage
  useEffect(() => {
    const fetchActivityData = () => {
    const storedStats = JSON.parse(localStorage.getItem("activityStats")) || {
      encrypted: 0,
      decrypted: 0,
      downloads: 0,
      success: 0,
      lastActivity: "Not Available",
    };

    const activities = JSON.parse(localStorage.getItem("fileActivities")) || []

    setStats(storedStats);
    setFileActivities(activities);
  };

  fetchActivityData(); // Initial fetch
  
  const interval = setInterval(fetchActivityData, 2000); // Every 2 seconds

  return () => clearInterval(interval); // Cleanup interval
  }, []);

  //Bar Chart Data
  const barData = {
    labels: ["Encrypted", "Decrypted", "Downloads", "Successful Ops", "Failed Ops"],
    datasets: [
      {
        label: "Activity Count",
        data: [stats.encrypted, stats.decrypted, stats.downloads, stats.success, stats.failed || 0],
        backgroundColor: ["#9d4edd", "#7b2cbf", "#5a189a", "#3c096c", "#e63946"]
      }
    ]
  };

  //Pie Chart Data
  const pieData = {
    labels: ["Encrypted", "Decrypted", "Downloads", "Successful Ops", "Failed Ops"],
    datasets: [
      {
        data: [stats.encrypted, stats.decrypted, stats.downloads, stats.success, stats.failed || 0],
        backgroundColor: ["#80ed99", "#fca311", "#5E40BE", "#732E00", "#e63946"]
      }
    ]
  };

  //Line Chart Data
  const lineData = {
    labels: fileActivities.map((item) => item.timestamp),
    datasets: [
      {
        label: "File Activities Over Time",
        data: fileActivities.map((_, idx) => idx + 1),
        fill: false,
        borderColor: "#7b2cbf",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="App">
      <h2>📊 Dashboard Summary</h2>
      <p>Last activity: <strong>{stats.lastActivity}</strong></p>

      <div className="container">
        <div style={{ width: "45%" }}>
          <Bar data={barData} />
        </div>
        <div style={{ width: "45%" }}>
          <Doughnut data={pieData} />
        </div>
        </div>

      <div style={{ width: "70%", margin: "30px auto" }}>
        <Line data={lineData} />
      </div>

      <button style={{ marginTop: "20px" }} onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "View More Details"}
      </button>

      {showDetails && (
        <div style={{ marginTop: "20px" }}>
        <h3>📁 File Activity List</h3>
        <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
          {fileActivities.map((file, index) => (
            <li key={index}>
              <strong>{file.fileName}</strong> - {file.type} at {file.timestamp}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div> 
  );
};

export default AdminDashboard;
