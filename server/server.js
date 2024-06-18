import express from "express";
import cors from "cors";
import { PORT } from "./config/global.js";
import { connectDB } from "./config/database.js";
import router from "./src/routes/index.js"; // Importa el enrutador

const app = express();
app.use(express.json()); // Middleware para analizar datos JSON en las solicitudes
app.use(cors());

app.use("/api/", router);

// Conectar a la base de datos
connectDB();
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
