const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const Book = require('../models/Book');

// Ruta para obtener todos los préstamos
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find().populate('book').populate('user');
    res.json(loans);
  } catch (error) {
    console.error(`Error fetching loans: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ruta para crear un nuevo préstamo
router.post('/', async (req, res) => {
  const { user, book } = req.body;

  try {
    const bookToLoan = await Book.findById(book);

    if (!bookToLoan) {
      console.error('Book not found');
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!bookToLoan.available) {
      console.error('Book is already on loan');
      return res.status(400).json({ message: 'Book is already on loan' });
    }

    const loan = new Loan({ user, book });
    await loan.save();

    // Actualizar la disponibilidad del libro
    bookToLoan.available = false;
    await bookToLoan.save();

    console.log(`Book ${bookToLoan.title} availability updated to ${bookToLoan.available}`);

    res.status(201).json({ message: 'Loan created successfully' });
  } catch (error) {
    console.error(`Error creating loan: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ruta para devolver un libro y actualizar la disponibilidad
router.put('/return/:id', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('book');
    
    if (!loan) {
      console.error('Loan not found');
      return res.status(404).json({ message: 'Loan not found' });
    }

    loan.returnDate = Date.now();
    await loan.save();

    // Actualizar la disponibilidad del libro
    loan.book.available = true;
    await loan.book.save();

    console.log(`Book ${loan.book.title} availability updated to ${loan.book.available}`);

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error(`Error returning loan: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
