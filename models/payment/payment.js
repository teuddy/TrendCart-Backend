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
//what type of payment method was used
paymentMethodType: {
  type: String,
  required: true,
},
paymentIntentId: {
  type: String,
  required: true
},
paymentIntentStatus: {
  type: String,
  required: true,
  enum:['succeeded', 'processing', 'requires_payment_method', 'requires_confirmation', 'requires_action', 'canceled']
},

createdAt: {
  type: Date,
  default: Date.now
}
});

module.exports = paymentSchema