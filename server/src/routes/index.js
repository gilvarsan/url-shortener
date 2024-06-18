import express from "express"; // Importa el framework Express
import fs from "fs"; // Importa el módulo de sistema de archivos de Node.js
import path from "path"; // Importa el módulo de rutas de Node.js
import { fileURLToPath } from "url"; // Importa una función para trabajar con URLs y archivos

// Configuración necesaria para obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta del archivo actual
const __dirname = path.dirname(__filename); // Obtiene el directorio del archivo actual

const router = express.Router(); // Crea un enrutador de Express
const pathRouter = `${__dirname}`; // Define la ruta del directorio de rutas

// Función para importar y configurar las rutas
const importRoutes = async () => {
  const files = fs.readdirSync(pathRouter); // Lee todos los archivos del directorio de rutas

  // Utiliza Promise.all para importar rutas de manera concurrente
  await Promise.all(
    files.map(async (file) => {
      // Obtiene el nombre del archivo sin la extensión
      const fileWithOutExt = path.basename(file, path.extname(file));

      // Omite el archivo 'index' para evitar bucles infinitos
      if (fileWithOutExt !== "index") {
        try {
          // Importa el módulo de ruta de manera dinámica
          const module = await import(`./${fileWithOutExt}.js`);
          // Usa el módulo importado en el enrutador
          router.use(`/${fileWithOutExt}`, module.default || module);
        } catch (err) {
          // Manejo de errores de importación
          console.error(`Failed to import route ${fileWithOutExt}: ${err}`);
        }
      }
    })
  );

  // Ruta 404: Se define después de cargar todas las rutas
  router.use((req, res) => {
    res.status(404).send({ error: "Not found" });
  });
};

// Cargar rutas
await importRoutes();

export default router; // Exporta el enrutador configurado
