const mongoose = require('mongoose');





// Define the payment schema
const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
},
paymentMethod: {
  type: String,
  required: true,
  enum: ['Stripe']
},
paymentIntentId: {
  type: String,
  required: true
},
createdAt: {
  type: Date,
  default: Date.now
}
});

module.exports = paymentSchema