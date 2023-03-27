

const express = require('express')
const router = express.Router();
const {Payment} = require('../../models')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


/**
 * @swagger
 * /v1/payments/charge:
 *   post:
 *     summary: Create a payment intent
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               source:
 *                 type: string
 *               receipt_email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client_secret:
 *                   type: string
 *       500:
 *         description: Server error
 */

router.post('/charge',  async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // amount in cents
      currency: 'usd',
      metadata: {
        webhookEndpoint: process.env.WEBHOOK_ENDPOINT
      }
    });
    
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
});


      



module.exports = router;