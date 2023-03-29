

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
    console.log(req.user)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // amount in cents
      currency: 'usd',
      metadata: {
        webhookEndpoint: process.env.WEBHOOK_ENDPOINT,
        userId: JSON.stringify(req.user._id),

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
  //get paymentIntent
  const paymentIntent = event.data.object;

  //if event is payment intent no matter the status
  if (event.type.includes('payment_intent')) {
       //esta es la metadata del user id del payment intent. etc
    const userId = paymentIntent.metadata.userId;
    //if payment intent already exists in the db just update the status
    Payment.find({ paymentIntentId: paymentIntent.id }, async (err, payment) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: 'Failed to find payment intent' });
      }
      if (payment.length) {
        const updatedPayment = await Payment.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          { paymentIntentStatus: paymentIntent.status },
          { new: true }
        );
        return res.status(200).send(updatedPayment);
      }
      //if payment intent does not exist in the db create it
      else {
        const newPayment = new Payment({
          user: userId,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          paymentMethodType: paymentIntent.payment_method_types[0],
          paymentIntentId: paymentIntent.id,
          paymentIntentStatus: paymentIntent.status,
 
          
        });
        const savedPayment = await newPayment.save();
        return res.status(200).send(savedPayment);
      }
    }
    );
  }




});


      



module.exports = router;