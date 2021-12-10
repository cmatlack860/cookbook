import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import SingleRecipe from './singleRecipe';
import PostRecipe from './postRecipe';
import SearchBar from './searchBar';
import RecipeList from './recipeList';


class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   recipes: [],
    //   searchText: '' 
    // }
    this.loading = <h3>Just waiting for our recipes to load!</h3>
    this.handleCreatePost = this.handleCreatePost.bind(this);
    // this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
 

  handleDelete(id, e) {
    axios
      .delete(`http://localhost:5002/recipes/${id}`)
      .then((res) => {
        console.log(res);
        let recipes = [...this.state.recipes];
        recipes = recipes.filter((item) => item._id !== id);
        console.log(this.state.recipes);
        console.log(recipes);
        this.setState({recipes});
      })
      .catch((err)=>{
        console.log(err);
        return err
      })
  }

  handleCreatePost(data) {
    axios
      .post("http://localhost:5002/recipes", data)
      .then((res) => { 
        console.log(res);
        data._id = res.data._id;
        let recipes = [...this.state.recipes];
        recipes.push(data);
        this.setState({recipes});
        console.log(this.state.recipes)
      })
      .catch(err => console.log(err));
    
  };

  handleUpdateState(data) {
    this.setState({data});
    console.log(this.state)
  }

  // handleSearch(search) {
  //   this.setState({searchText: search});
  //   console.log(this.state.searchText);
  // };  

  render() {
    // const searchText = this.state.searchText;

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
              <RecipeList handleDelete={this.handleDelete} />
               {/* recipes={this.state.recipes} searchText={this.state.searchText} this line goes above in recipeList comp*/}
          </div>
          <div>
            <Link to={'/recipes/post'} component={PostRecipe} post={this.post(data)}> Click here to post a recipe to the database </Link>
            <PostRecipe handleCreatePost={this.handleCreatePost} />
          
          </div>
        </Route>
        <Route path='/recipes/:_id' component={SingleRecipe} />        
      </Switch>
    </Router>
    );
  }
}
 
export default App;