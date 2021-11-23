import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import SingleRecipe from './singleRecipe';
import PostRecipe from './postRecipe';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    }
    this.loading = <h3>Just waiting for our recipes to load!</h3>
  }

  post(event) {
    const newTitle = document.getElementById("title").value;
    const newPreptime = document.getElementById("prep_time").value;
    const newIng = document.getElementById("ingredients").value;
    const newInst = document.getElementById("instructions").value;
    const newImage = document.getElementById("image").value;
    const newStory = document.getElementById("story").value;
  }

  componentDidMount() {
    fetch('http://localhost:5002/recipes')
    .then((res)=> res.json())
    .then((data)=>{
      let recipeList = data;
      console.log(recipeList);
      this.setState({recipes: recipeList})
    })
    .catch((err)=>{
      console.log(err);
      return err;
    })
  }

  render() { 
    return (
    <Router>
      <div className='container px-2'>
        <h1 className='text-center'>Welcome to Chris's Collosal Recipe Book!</h1>
        <p>Looking to find that perfect recipe for tonight? Need the exact ingrediants and steps without having
          to read through someones entire life story? Use our built in recipe book tool to keep your on records
          of what recipes you want on any given day. Update recipes, delete recipes, post new recipes, the choice is yours!
        </p>
        <br/>
      </div>
      <Switch>
        <Route exact path='/'>
          <div className='grid-list'>
            <ul className='list-group'>
              { this.state.recipes.map((recipe)=>
                <li key={recipe.id}><Link to={'/recipes/' + recipe._id}> {recipe.title} </Link></li>
                // <li key={recipe.id}> {recipe.prep_time} </li>
                // <li key={recipe.id}> {recipe.ingredients} </li>
                // <li key={recipe.id}> {recipe.isntructions} </li>
                // <li key={recipe.id}> {recipe.story} </li>
              )};
            </ul>
          </div>
          <div>
            <Link to={'/recipes/post'} component={PostRecipe}> Click here to post a recipe to the database </Link>
          </div>
        </Route>
        <Route path='/recipes/:_id' component={SingleRecipe} />        
      </Switch>
    </Router>
    );
  }
}
 
export default App;