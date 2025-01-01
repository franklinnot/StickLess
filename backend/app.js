import express from "express";
import path from "path";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

// Rutas
import searchRoutes from "./src/routes/search.js";

dotenv.config();

const app = express();

// Middlewares de seguridad y configuración
app.use(helmet());
app.use(cors());
app.use(cors({
    origin: "http://localhost:3000" // único dominio de origen permitido
}));

// Middlewares de procesamiento de solicitudes
app.use(express.json());
app.use(express.text());

// Middleware para servir archivos estáticos de la carpeta public
app.use(express.static(path.join(process.cwd(), "public")));

// Middleware de registro de solicitudes
app.use((req, res, next) => {
    console.log(`Solicitud: ${req.method} ${req.url}`);
    next();
});

// Rutas
app.use("/api/search", searchRoutes);

// Manejo de errores
app.use((req, res) => {
    res.status(404).send(`Página no encontrada: ${req.method} ${req.url}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo salió mal...");
});

// Exportar la aplicación
export default app;
