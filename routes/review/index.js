const express = require('express');
const router = express.Router();
const {Review} = require('../../models')
const {isAuthenticated} = require('../../auth/auth')


/**
 * @swagger
 * /v1/reviews/product/{productId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to retrieve reviews for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server error
 */
router.get('/product/:productId', (req, res) => {
    Review.find({ productId: req.params.productId }).then((reviews) => {
      res.json(reviews);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });

/**
 * @swagger
 * /v1/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               rating:
 *                 type: number
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server error
 */
router.post('/', isAuthenticated, (req, res) => {
  const review = new Review({
    text: req.body.text,
    rating: req.body.rating,
    user: req.user._id,
    product: req.body.productId
  });

  review.save().then((savedReview) => {
    res.json(savedReview);
  }).catch((err) => {
    res.status(500).json({ error: err.message });
  });
});

//64219f08beba530f32811da8
  module.exports = router;

  
  