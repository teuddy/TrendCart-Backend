const express = require('express');
const router = express.Router();
const categoryRouter = require('./category')
const productRouter = require('./product')
const userRouter = require('./user')
const reviewRouter = require('./review')
const orderRouter = require('./order')
const paymentRouter = require('./payment')

router.use('/products',productRouter)
router.use('/categories', categoryRouter);
router.use('/users', userRouter);
router.use('/reviews', reviewRouter)
router.use('/orders',orderRouter)
router.use('/payments',paymentRouter)

module.exports = router;

