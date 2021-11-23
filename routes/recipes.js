const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipes');


router.get('/', async (req, res)=>{
  const recipes = await Recipe.find();
  res.json(recipes);
})

router.post('/', async (req, res)=>{
  const newRecipe = new Recipe(req.body);
  
  const savedRecipe = await newRecipe.save();

  res.json(savedRecipe);
})

router.get('/random', async (req, res)=>{
  const count = await Recipe.countDocuments();
  const random = Math.floor(Math.random() * count);
  const r = await Recipe.findOne().skip(random);
  res.json(r);
})

router.get('/:id', async (req, res)=>{
  const singleRecipe = await Recipe.findById({_id: req.params.id});

  res.json(singleRecipe);
})

router.put('/:id', async (req, res)=>{

  const updatedRecipe = await Recipe.updateOne(
    {_id: req.params.id}, {$set: req.body});
  res.json(updatedRecipe);
})

router.delete('/:id', async (req,res)=>{
  const result = Recipe.findByIdAndDelete({_id: req.params.id});
  res.json(result);
})


module.exports = router;