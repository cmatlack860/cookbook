const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const dbrecipes = mongoose.connection;

dbrecipes.once('open', ()=>{
  console.log('connected to mongoose')
})

const RecipesRoute = require('./routes/recipes');
app.use('/recipes', RecipesRoute)


app.listen(5002, ()=>{
  console.log('server listening on port 5002')
})

