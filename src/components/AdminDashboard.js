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
  const [selectedUser, setSelectedUser] = useState("all");
  const [userList, setUserList] = useState([]);

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
    const users = [...new Set(activities.map(act => act.user))];

    setStats(storedStats);
    setFileActivities(activities);
    setUserList(users);
  };

  fetchActivityData(); // Initial fetch
  
  const interval = setInterval(fetchActivityData, 2000); // Every 2 seconds

  return () => clearInterval(interval); // Cleanup interval
  }, []);

  const filteredActivities = selectedUser === "all"
    ? fileActivities
    : fileActivities.filter(activity => activity.user === selectedUser);

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

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(fileActivities, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "activity-log.json";
    link.click();
  };

  const handleExportCSV = () => {
    const header = "User,File Name,Type,Timestamp\n";
    const rows = fileActivities.map(a => `${a.user},${a.fileName},${a.type},${a.timestamp}`).join("\n");
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "activity-log.csv";
    link.click();
  };

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to clear all activity data?")) {
      localStorage.removeItem("fileActivities");
      localStorage.removeItem("activityStats");
      setFileActivities([]);
      setStats({ encrypted: 0, decrypted: 0, downloads: 0, success: 0, failed: 0, lastActivity: "Not Available" });
      setUserList([]);
    }
  };

  const getMostActiveUsers = () => {
    const counts = {};
    fileActivities.forEach(a => {
      counts[a.user] = (counts[a.user] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  return (
    <div className="App">
      <h2>📊 Dashboard Summary</h2>
      <p>Last activity: <strong>{stats.lastActivity}</strong></p>

      <div style={{ margin: "10px 0" }}>
        <label>Filter by User: </label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="all">All Users</option>
          {userList.map((u, i) => (
            <option key={i} value={u}>{u}</option>
          ))}
        </select>
      </div>

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

      <button style={{ marginTop: "10px" }} onClick={handleExportJSON}>Export as JSON</button>
      <button style={{ marginTop: "10px", marginLeft: "10px" }} onClick={handleExportCSV}>Export as CSV</button>
      <button style={{ marginTop: "10px", marginLeft: "10px", backgroundColor: "#e63946", color: "white" }} onClick={handleClearAllData}>Clear All Activity Data</button>

      <div style={{ marginTop: "30px" }}>
        <h3>🔥 Most Active Users</h3>
        <ul style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
          {getMostActiveUsers().map(([user, count], index) => (
            <li key={index}><strong>{user}</strong>: {count} actions</li>
          ))}
        </ul>
      </div>

      <button style={{ marginTop: "20px" }} onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "View More Details"}
      </button>

      {showDetails && (
        <div style={{ marginTop: "20px" }}>
        <h3>📁 File Activity List</h3>
        <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
          {filteredActivities.map((file, index) => (
            <li key={index}>
              <strong>{file.username}</strong> - {file.fileName} - {file.type} at {file.timestamp}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div> 
  );
};

export default AdminDashboard;
