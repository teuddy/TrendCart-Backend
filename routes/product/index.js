const express = require('express');
const router = express.Router();
const {Product} = require('../../models')



  /**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for products in your application
 *
 * /v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Returns a product with the given ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
  router.get('/:id', (req, res) => {
    Product.findById(req.params.id).select('name description price quantity currency category image').then((product) => {
      res.json(product);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  /**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for products in your application
 * /v1/products:
 *   get:
 *     summary: Get a list of products
 *     description: Returns a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', (req, res) => {
    Product.find().select('name description price category image currency').then((products) => {
      res.json(products);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  


/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for products in your application
 *
 * /v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product with the given name, description, price, quantity, currency, category, image, isPhysical, and isVirtual
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               currency:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *               isPhysical:
 *                 type: boolean
 *               isVirtual:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/', (req, res) => {
    const {name, description, price, quantity, currency, category, image, isPhysical, isVirtual} = req.body;
    const product = new Product({name, description, price, quantity, currency, category, image, isPhysical, isVirtual});
    product.save().then((product) => {
      console.log(product);
      res.json(product);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  /**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for products in your application
 *
 * /v1/products/category/{category}:
 *   get:
 *     summary: Get all products in a category
 *     description: Returns a list of all products in a category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The name of the category to retrieve products for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/category/:category', (req, res) => {
    const category = req.params.category;
    Product.find({ category }).select('name price').then((products) => {
      res.json(products);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for products in your application
 *
 * /v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Updates a product with the given ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               currency:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *               isPhysical:
 *                 type: boolean
 *               isVirtual:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((product) => {
      res.json(product);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });


  /**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for products in your application
 *
 * /v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Deletes a product with the given ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(() => {
      res.json({ message: 'Product deleted' });
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  module.exports = router;
