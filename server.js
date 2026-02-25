const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde dist/viajes-premier/browser
app.use(express.static(path.join(__dirname, 'dist/viajes-premier/browser')));

// Manejar todas las rutas y redirigir a index.html para SPA routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/viajes-premier/browser/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
