const express = require('express');
const router = express.Router();
const {User} = require('../../models')
const {isAuthenticated,createToken} = require('../../auth/auth')


/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', async (req, res) => {
  // Check if user with given email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Check if password is correct
  const validPassword = req.body.password === user.password;
  
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Return token
  res.json(createToken(user._id))
});

module.exports = router;

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address
  });

  user.save().then((savedUser) => {
    // res.json(savedUser);
    res.json(createToken(savedUser._id))
  }).catch((err) => {
    res.status(500).json({ error: err.message });
  });
});


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /v1/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 address:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', isAuthenticated, (req, res) => {
  const { id, name, email, address } = req.user;
  res.json({ id, name, email, address });
});


module.exports = router