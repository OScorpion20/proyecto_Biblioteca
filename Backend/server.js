const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./backend/config/db');
const bookRoutes = require('./backend/routes/bookRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const loanRoutes = require('./backend/routes/loanRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Rutas del backend
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Redireccionar todas las demás rutas al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
