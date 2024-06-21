// Register.jsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("User registered successfully!🚀");
      //set campos a vacio
      setUsername("");
      setEmail("");
      setPassword("");
      //redirigimos a la página de login
      navigate("/Login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <div className="inputLogRes">
        <h1 className="registerpage-h1">Register</h1>
        <input
          className="registerpage-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="registerpage-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="registerpage-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="registerpage-button" onClick={handleRegister}>
          Register
        </button>
        <div>
          <h2 className="registerpage-h2">
            Already have an account?{" "}
            <a className="registerpage-a">
            <Link className="link" to="/login">Login</Link>
           
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Register;
