const express = require('express');
const router = express.Router();
const categoryRouter = require('./category')


router.use('/categories', categoryRouter);




module.exports = router;

