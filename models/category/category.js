const mongoose = require('mongoose');
// Define the category schema
const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  });

module.exports = categorySchema;
  