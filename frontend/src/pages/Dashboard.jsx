import React from "react";
import "../styles/dashboard.css";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-h1">Dashboard</h1>
      <a className="dashboard-a">
        <Link className="link"to="/home">➡️ HOME ⬅️</Link>
      </a>
    </div>
  );
};
