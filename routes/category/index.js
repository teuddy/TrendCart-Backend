

const express = require('express')
const router = express.Router();

const {Category} = require('../../models')

/**
 * @swagger
 *
 * /v1/categories:
 *   get:
 *     summary: Get a list of categories
 *     description: Returns a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: OK
 */

router.get('/', (req, res) => {
    Category.find().select('name description').then((categories) => {
      res.json(categories);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  


/**
 * @swagger
 * /v1/categories:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category with the given name and description
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/', (req, res) => {
  const {name, description} = req.body
  const category = new Category({name,description});
  category.save().then((category) => {
    res.json(category);
  }).catch((err) => {
      res.status(500).json({ error: err.message });
  });
});
  

/**
 * @swagger
 * /v1/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: Updates a category with the given ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to update
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
 *     responses:
 *       200:
 *         description: OK
 */
router.put('/:id', (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((category) => {
    res.json(category);
  }).catch((err) => {
    res.status(500).json({ error: err.message });
  });
});
  


/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: API for categories in your application
 *
 * /v1/categories/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category with the given ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/:id', (req, res) => {
  Category.findByIdAndDelete(req.params.id).then(() => {
    res.json({ message: 'Category deleted' });
  }).catch((err) => {
    res.status(500).json({ error: err.message });
  });
});



module.exports = router;
