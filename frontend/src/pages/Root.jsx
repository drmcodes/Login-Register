import React from "react";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate(); // Aquí declaramos navigate

  return (
    <div className="padre">
      <div className="children">
        <h1 className="h1">Nothing to see here</h1>

        <button
          className="btn"
          onClick={() => navigate("/login")}
          style={{ margin: 10 }}
        >
          Login
        </button>
        <button className="btn" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Root;
