const mongoose = require('mongoose');

const categorySchema = require('./category/category');
const productSchema = require('./product/product');
const reviewSchema = require('./review/review');
const userSchema = require('./user/user');
const orderSchema = require('./order/order');
const paymentSchema = require('./payment/payment');



const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Review = mongoose.model('Review', reviewSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Payment = mongoose.model('Payment', paymentSchema);

// Export the models
module.exports = { Category, Product, Review, User, Order, Payment };
