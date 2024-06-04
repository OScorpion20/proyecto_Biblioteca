const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // Importar el paquete cors
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const loanRoutes = require('./routes/loanRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Usar el middleware cors
app.use(express.json());

// Rutas del backend
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Redireccionar todas las demás rutas al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
