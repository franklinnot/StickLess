import app from "./app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`El servidor se encuentra activo en http://localhost:${port}`);
});
