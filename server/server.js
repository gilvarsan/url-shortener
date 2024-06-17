const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./src/routes"); // Importa el enrutador
const connectDB = require("./config/database");

const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware para analizar datos JSON en las solicitudes
app.use(cors());

app.use("/api/", router);

// Conectar a la base de datos
connectDB();
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
