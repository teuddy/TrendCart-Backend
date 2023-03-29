

const express = require('express')
const router = express.Router();
const {Payment} = require('../../models')
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {isAuthenticated,createToken} = require('../../auth/auth')


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

router.post('/charge', isAuthenticated, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // amount in cents
      currency: 'usd',
      metadata: {
        webhookEndpoint: process.env.WEBHOOK_ENDPOINT,
        user: req.user
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

//hay que usar body-parser para poder usar req.body del stripe 



router.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  //get payment itnent metadata
  const paymentIntent = event.data.object;
  const user = paymentIntent.metadata.user;

  console.log("este es el objeto payment intent", paymentIntent);
  console.log("este es el usuario que lo hizo", user);

  // //create Payment
  // const payment = new Payment({
  //   user: user._id,
  //   amount: paymentIntent.amount,
  //   currency: paymentIntent.currency,
  //   status: paymentIntent.status,
  //   paymentIntentId: paymentIntent.id
  // });





  //list al events types of payment intent
  //https://stripe.com/docs/api/payment_intents/object#payment_intent_object-status

  // if (event.type === 'payment_intent.succeeded') {
  //   const paymentIntent = event.data.object;
  //   console.log(paymentIntent);
  //   // Handle successful payment
  // }

  

  res.status(200).send();
});

      



module.exports = router;