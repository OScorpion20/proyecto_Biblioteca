const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loanDate: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date
  }
});

module.exports = mongoose.model('Loan', loanSchema);
