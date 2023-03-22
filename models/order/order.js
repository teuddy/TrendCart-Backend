const mongoose = require('mongoose');


// Define the order schema
const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }],
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Placed', 'Shipped', 'Delivered']
    },
    date: {
      type: Date,
      default: Date.now
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment'
    }
  });


  module.exports = orderSchema