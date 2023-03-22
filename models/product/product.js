const mongoose = require('mongoose');


// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'JPY', 'GBP']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    image: {
      type: String,
      required: true
    },
    isPhysical: {
      type: Boolean,
      default: true
    },
    isVirtual: {
      type: Boolean,
      default: false
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }],
    sold: {
      type: Number,
      default: 0
    }
  });

  module.exports =productSchema