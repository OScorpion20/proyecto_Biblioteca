const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookRoutes = require('../Backend/routes/bookroutes');
const userRoutes = require('../Backend/routes/userroutes');
const loanRoutes = require('../Backend/routes/loanroutes');

dotenv.config();
connectDB();


const app = express();


app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
