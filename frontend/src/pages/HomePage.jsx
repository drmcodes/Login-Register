import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const Home = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setUser(decoded.username);

    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts");
        if (!res.ok) {
          throw new Error("Error fetching posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: decoded.username,
          message: message,
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      console.log(data); // Puedes manejar la respuesta como lo necesites

      // Actualizar la lista de publicaciones con el nuevo post
      setPosts((prevPosts) => [
        ...prevPosts,
        {
          username: decoded.username,
          message: message,
          createdAt: new Date().toISOString(),
        },
      ]);
      setMessage(""); // Limpiar el estado del input después de enviar el post
    } catch (error) {
      console.error("Error posting:", error);
      // Manejo de errores aquí
    }
  };

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <h1 className="homepage-h1">Welcome {user}</h1>
        <div className="navbar-buttons">
          <button className="logout-button" onClick={logout}>
            LOG OUT
          </button>
          <a className="homepage-a" href="/dashboard">
            ➡️ DASHBOARD ⬅️
          </a>
        </div>
      </nav>
      <div className="container">
        <p className="container-p">
          Welcome {user} to the home page! Here, you can post updates, upload
          photos, add friends, and much more. <br /> Stay tuned for exciting new
          features in upcoming versions! 🚀
        </p>
      </div>
      <div className="father-post-div">
        <h1 className="h1-post">Posts</h1>

        <ul>
          {posts.map((post, index) => (
            <li className="ul-li" key={index}>
              <strong>{post.username}: </strong>
              {post.message} ||{" "}
              <span className="date-bold">{formatDate(post.createdAt)} </span>{" "}
              ✅
            </li>
          ))}
        </ul>
      </div>
      <div className="input-btn-div">
        <form className="push-form" onSubmit={handleSubmit}>
          <input
            className="input-post"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your post..."
            required
          />
          <button className="btn-post" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
