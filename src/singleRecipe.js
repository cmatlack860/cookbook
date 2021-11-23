import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class SingleRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      prep_time: '',
      ingredients: '',
      instructions: '',
      image: '',
      story: ''
  }
}
  componentDidMount() {
    fetch('http://localhost:5002/recipes/' + this.props.match.params._id)
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);
      let singleTitle = data.title;
      let singlePreptime = data.prep_time;
      let singleIng = data.ingerdients;
      let singleInst = data.instructions;
      let singleImg = data.image;
      let singleStory = data.story;
      this.setState({title: singleTitle, prep_time: singlePreptime, ingredients: singleIng, instructions: singleInst, image: singleImg, story: singleStory})
      console.log(this.state.recipe);
    })
  }
  render() { 
    return (
      <div>
        <Link to={'/'}>Back</Link>
        <h2> {this.state.title} </h2>
            <br/>
            <li> Prep Time: {this.state.prep_time} </li>
            <li> Ingredients: {this.state.ingredients} </li>
            <li> Instructions: {this.state.instructions} </li>
            <li> Image: <img src={this.state.image} alt=''/> </li>
            <li> Story: {this.state.story} </li>
      
      </div>
    );
  }
}
 
export default SingleRecipe;