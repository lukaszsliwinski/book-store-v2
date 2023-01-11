const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
    default: 1
  },

  username: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  books: {
    type: Array,
    required: true
  },

  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model.Orders || mongoose.model('Orders', OrderSchema);
