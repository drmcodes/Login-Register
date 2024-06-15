import React from "react";
import "../styles/dashboard.css";

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-h1">Dashboard</h1>
      <a className="dashboard-a" href="http://localhost:5173/home">
        ➡️ HOME ⬅️
      </a>
    </div>
  );
};
