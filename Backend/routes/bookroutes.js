const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Ruta para obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Ruta para agregar un nuevo libro
router.post('/', async (req, res) => {
  const { title, author, isbn } = req.body;

  try {
    const book = new Book({ title, author, isbn });
    await book.save();
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
