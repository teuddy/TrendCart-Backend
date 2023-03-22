const express = require('express')
const router = express.Router();

const {Category} = require('../../models')


// dont really like this way of catch errors but, lets see if it works


// Define routes for categories
router.get('/', (req, res) => {
    Category.find().select('name description').then((categories) => {
      res.json(categories);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  
  router.post('/', (req, res) => {
    const {name, description} = req.body
    const category = new Category({name,description});
    category.save().then((category) => {
      console.log(category)
      res.json(category);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  
  router.get('/:id', (req, res) => {
    Category.findById(req.params.id).then((category) => {
      res.json(category);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  
  router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((category) => {
      res.json(category);
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  
  router.delete('/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(() => {
      res.json({ message: 'Category deleted' });
    }).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });
  
  module.exports = router;
