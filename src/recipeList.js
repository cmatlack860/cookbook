import React, { Component } from 'react';
import SearchBar from './searchBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      searchText: '' 
    }
  }

  componentDidMount() {
    fetch(`http://localhost:5002/recipes`)
    .then((res)=> res.json())
    .then((data)=>{
      this.setState({recipes: data})
      console.log(this.state.recipes);
    })
    .catch((err)=>{
      console.log(err);
      return err;
    })
  }

  render() { 
    return (
    <div>
      <SearchBar handleSearch={this.handleSearch} className="" />
      <div className='grid-list'>
        <ul className='list-group'>
          { this.state.recipes.map((recipe)=> {
            // if (recipe.title.indexOf(searchText) !== -1) {
            //   return <li className='p-2' key={recipe._id}><Link to={'/recipes/' + recipe._id}> {recipe.title} </Link>
            //   <img src={recipe.image} width="100px" height="100px" alt="" className="m-2" /><button className='btn-danger m-3' onClick={(e) => this.handleDelete(recipe._id, e)}>Delete</button></li>
            // } 
            // if (recipe.title.indexOf(searchText) == '') {
            <li className='p-2' key={this.state.recipes._id}><Link to={'/recipes/' + recipe._id}> {this.state.recipes.title} </Link>
            <img src={this.state.recipes.image} width="100px" height="100px" alt="" className="m-2" /><button className='btn-danger m-3' onClick={(e) => this.props.handleDelete(recipe._id, e)}>Delete</button></li>}
            // if (recipe.title.indexOf(searchText) === -1) {
            //   return 'No recipe found';
            // }})
          )};
        </ul>
      </div>
    </div>
    );
  }
}
 
export default RecipeList;