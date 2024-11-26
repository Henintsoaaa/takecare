const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { createConnection } = require("./lib/db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware to add necessary CORS headers to all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Handle preflight requests (OPTIONS)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Bienvenue sur le serveur!</h1>");
});

// Route to fetch private messages
app.get("/api/messages", async (req, res) => {
  const senderId = req.query.senderId;
  const receiverId = req.query.receiverId;

  if (!senderId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const conn = await createConnection();
    const [rows] = await conn.execute(
      `SELECT * FROM private_messages 
    WHERE (sender_id = ? AND receiver_id = ?) 
    OR (sender_id = ? AND receiver_id = ?)
    ORDER BY sent_at ASC;`,
      [7, 5, 5, 7]
    );
    await conn.end();

    return res.json(rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("private-message", async (data) => {
    try {
      const conn = await createConnection();
      const [result] = await conn.execute(
        "INSERT INTO private_messages (sender_id, receiver_id, content) VALUES (?, ?, ?)",
        [data.senderId, data.receiverId, data.content]
      );
      await conn.end();

      io.to(`user_${data.receiverId}`).emit("new-message", {
        id: result.insertId,
        sender_id: data.senderId,
        content: data.content,
        sent_at: new Date(),
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("join-user", (senderId) => {
    socket.join(`user_${senderId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Route pour récupérer les données du fichier status.json
app.get("/api/Datastatus", (req, res) => {
  const filePath = path.join(__dirname, "./status.json");

  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.status(200).json([]); // Renvoie une liste vide si le fichier n'existe pas
      }
      console.error("Erreur de lecture :", err);
      return res.status(500).send("Erreur interne du serveur.");
    }

    try {
      const data = JSON.parse(fileData);
      res.status(200).json(data);
    } catch (parseErr) {
      console.error("Erreur de parsing des données :", parseErr);
      res.status(500).send("Erreur lors de la lecture des données.");
    }
  });
});

// Route GET pour tester l'API
app.get("/api/save-status", (req, res) => {
  res.send(
    "Endpoint POST /api/save-status est en ligne. Utilisez POST pour soumettre des données."
  );
});

// Route POST pour ajouter de nouvelles données sans supprimer les anciennes
app.post("/api/save-status", (req, res) => {
  const data = req.body;

  // Validation des données reçues
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).send("Données invalides.");
  }

  const filePath = path.join(__dirname, "./status.json");

  // Lecture du fichier existant pour préserver les données précédentes
  fs.readFile(filePath, "utf8", (err, fileData) => {
    let statusList = [];

    if (err) {
      // Gérer l'erreur uniquement si ce n'est pas un fichier manquant
      if (err.code !== "ENOENT") {
        console.error("Erreur de lecture :", err);
        return res.status(500).send("Erreur interne du serveur.");
      }
    } else {
      try {
        statusList = JSON.parse(fileData); // Convertir les données JSON existantes
      } catch (parseErr) {
        console.error("Erreur de parsing des données existantes :", parseErr);
        return res
          .status(500)
          .send("Erreur lors de la lecture des données existantes.");
      }
    }

    // Ajouter les nouvelles données à la liste
    statusList.push(data);

    // Sauvegarder la liste mise à jour dans le fichier
    fs.writeFile(filePath, JSON.stringify(statusList, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Erreur d'écriture :", writeErr);
        return res
          .status(500)
          .send("Erreur interne lors de l'écriture des données.");
      }

      res.status(200).send("Statut ajouté avec succès.");
    });
  });
});

// Ajout d'une route pour renvoyer les données de feedback.json
app.get("/api/Evaluations", (req, res) => {
  const filePath = path.join(__dirname, "./feedback.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      return res.status(500).send("Erreur interne du serveur.");
    }
    res.status(200).json(JSON.parse(data));
  });
});

// Route GET pour tester l'API
app.get("/api/save-feedback", (req, res) => {
  res.send(
    "Endpoint POST /api/save-feedback est en ligne. Utilisez POST pour soumettre des données."
  );
});

// Route pour enregistrer les données dans un fichier JSON
app.post("/api/save-feedback", (req, res) => {
  const data = req.body;

  // Validation des données reçues
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).send("Données invalides.");
  }

  const filePath = path.join(__dirname, "./feedback.json");

  // Écriture des données dans un fichier JSON
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Erreur lors de l'enregistrement des données :", err);
      return res
        .status(500)
        .send("Erreur lors de l'enregistrement des données.");
    }
    res.status(200).send("Données enregistrées avec succès !");
  });
});

// API pour vérifier si deux util

// Start the server
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
