const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: String,
  prep_time: String,
  ingredients: String,
  instructions: String,
  image: String,
  story: String,
})

module.exports = mongoose.model('Recipes', RecipeSchema);