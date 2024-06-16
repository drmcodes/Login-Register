// Estamos importando express, cors y mongoose.

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = "supersecretkey";

// Creando una instancia de express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Conectando a la base de datos de MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB🚀");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

// Creando el esquema de usuarioº
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// Creando el modelo de usuario
const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}✅`);
});

//Obtener datos de la API
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hola Mundo</title>
    </head>
    <body>
      <h1>Hola Mundo!🚀</h1>
    </body>
    </html>
  `);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!🚀" });
});

app.get("/api/data", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos", error });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
});

// Postear un mensaje

app.post("/api/posts", async (req, res) => {
  const { username, message, createdAt } = req.body;
  try {
    const newPost = new Post({ username, message, createdAt });
    await newPost.save();
    res.json({ message: "Posted successfully!🚀" });
  } catch (err) {
    console.error("Error uploading your post");
    res.status(500).json({ message: "Error uploading your post", error: err });
  }
});

app.post("/api/posts", async (req, res) => {
  const token = localStorage.getItem("token");
  decodedTokendata = jwtDecode(token);
})


// Registro de usuario

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully!🚀" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// Inicio de sesión

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials " });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
});
