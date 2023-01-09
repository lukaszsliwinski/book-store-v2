const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  bookId: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true,
    default: 1
  }
});

module.exports = mongoose.model.CartItems || mongoose.model('CartItems', CartItemSchema);
