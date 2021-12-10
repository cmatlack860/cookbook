import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UpdateRecipe from './updateRecipe';

class SingleRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      prep_time: '',
      ingredients: '',
      instructions: '',
      image: '',
      story: ''
    };
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }  

  handleUpdateState(data) {
    this.setState({data});
    console.log(this.state)
  }

  componentDidMount() {
    fetch('http://localhost:5002/recipes/' + this.props.match.params._id)
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      let singleTitle = data.title;
      let singlePreptime = data.prep_time;
      let singleIng = data.ingredients;
      let singleInst = data.instructions;
      let singleImg = data.image;
      let singleStory = data.story;
      this.setState({title: singleTitle, prep_time: singlePreptime, ingredients: singleIng, 
        instructions: singleInst, image: singleImg, story: singleStory})
      console.log(this.state);
    })
  }

  render() { 
    return (
      <div className='p-3'>
        <Link to={'/'}>Back</Link>
        <h2 className='mt-3'> {this.state.title} </h2>
            <br/>
            <li> Prep Time: {this.state.prep_time} </li>
            <li> Ingredients: {this.state.ingredients} </li>
            <li> Instructions: {this.state.instructions} </li>
            <li> Image: <img src={this.state.image} width="300px" height="300px" alt=''/> </li>
            <li> Story: {this.state.story} </li>
        <br></br>
        
          <h3> Want to edit this recipe? </h3>
            <Link to={{pathname: '/recipes/' + this.props.match.params._id +'/edit', handleUpdateState: this.handleUpdateState}}> Edit {this.state.title} </Link>
          <Route exact path='/recipes/:_id/edit' component={UpdateRecipe} /> .
       </div>
    );
  }
}
 
export default SingleRecipe;