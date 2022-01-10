import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleRecipe from './singleRecipe';
import PostRecipe from './postRecipe';
import SearchBar from './searchBar';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      searchText: '' 
    }
    this.loading = <h3>Just waiting for our recipes to load!</h3>
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
        console.log(this.state.recipes);
      })
      .catch(err => console.log(err));
    
  };

  handleUpdateState(data) {
    this.setState({data});
    console.log(this.state)
  }

  handleSearch(search) {
    this.setState({searchText: search});
    console.log(this.state.searchText);
  };  

  componentDidMount() {
    fetch(`http://localhost:5002/recipes`)
    .then((res)=> res.json())
    .then((data)=>{
      let recipeList = data;
      this.setState({recipes: recipeList});
      console.log(this.state.recipes);
    })
    .catch((err)=>{
      console.log(err);
      return err;
    })
  }
// create new component recipeLIst, pass down array of recipes from App.js as props to RecipeList, then use filter on props for search functionality
// RecipeList should contain all rendered pieces inside Route with path "/"

// try to set the POST method on new page
  render() {
    const searchText = this.state.searchText;

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
          <div className='px-2'>
          <SearchBar handleSearch={this.handleSearch} />
            <ul id='recipeList' className=''>
              { this.state.recipes.map((recipe)=> {
                if (recipe.title.indexOf(searchText) !== -1) {
                  return <li className='p-2' key={recipe._id}><Link to={'/recipes/' + recipe._id}> {recipe.title}
                  <img src={recipe.image} width="100px" height="100px" alt="imageURL" className="m-2" /></Link><button className='btn-danger m-3' onClick={(e) => this.handleDelete(recipe._id, e)}>Delete</button></li>
                } 
                if (recipe.title.indexOf(searchText) == '') {
                <li className='p-2' key={recipe._id}><Link to={'/recipes/' + recipe._id}> {recipe.title}
                <img src={recipe.image} width="100px" height="100px" alt="imageURL" className="m-2" /></Link><button className='btn-danger m-3' onClick={(e) => this.handleDelete(recipe._id, e)}>Delete</button></li>}
                if (recipe.title.indexOf(searchText) === -1) {
                  return 'No recipe found';
                }})
              }
            </ul>
            <br></br>
            <button id='postBtn' className="btn-secondary mb-2 m-auto" style={{textColor:'black', textDecoration:'none'}}><Link to={'/post'} > Click here to post a recipe to the database </Link></button>
            {/* <PostRecipe recipes={this.state.recipes} handleCreatePost={this.handleCreatePost} /> */}
          </div>
        </Route>
        <Route exact path='/recipes/:_id' component={SingleRecipe} />
        <Route exact path='/post' render={(props)=><PostRecipe {...props} recipe={this.state.recipe} handleCreatePost={this.handleCreatePost} /> } /> 
      </Switch>
    </Router>
    );
  }
}
 
export default App;