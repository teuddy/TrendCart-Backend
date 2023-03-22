const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  });

  module.exports = reviewSchema