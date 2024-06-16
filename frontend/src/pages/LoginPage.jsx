// Login.jsx
import React from "react";
import { useState } from "react"; // Aquí importamos useState
import { useNavigate } from "react-router-dom"; // Aquí importamos useNavigate para redirigir
import "../styles/login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Aquí declaramos navigate

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("User logged in successfully!🚀");
        //set campos a vacio
        setEmail("");
        setPassword("");
        //redirigimos a la página de home
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  return (
    <div>
      <div className="inputLogRes">
        <h1 className="loginpage-h1">Login</h1>
        <input
          className="loginpage-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="loginpage-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="loginpage-button" onClick={handleLogin}>
          Login
        </button>
        <div>
          <h2 className="loginpage-h2">
            Don't have an account?{" "}
            <a className="loginpage-a" href="http://localhost:5173/Register">
              Sign in
            </a>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
