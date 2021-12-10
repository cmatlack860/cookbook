import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';


class PostRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        prep_time: '',
        ingredients: '',
        instructions: '',
        image: '',
        story: ''
    }
    this.handlePost = this.handlePost.bind(this);
  }

  // use e.target to access the target element of the event - can then traverse dom
  //to specifically target any element and get its value through .value
  handlePost = e => {
    e.preventDefault();
    var data = {
      title: e.target.elements.title.value,
      prep_time: e.target.elements.prep_time.value,
      ingredients: e.target.elements.ingredients.value,
      instructions: e.target.elements.instructions.value,
      image: e.target.elements.image.value,
      story: e.target.elements.story.value
    }
    this.props.handleCreatePost(data);
    e.target.elements.title.value = '';
    e.target.elements.prep_time.value = '';
    e.target.elements.ingredients.value = '';
    e.target.elements.instructions.value = '';
    e.target.elements.image.value = '';
    e.target.elements.story.value = '';
  };

  render() { 
    return (
    <div>
      <Link to='/'>Back</Link>
      <h1 className="text-center"> Post a new recipe to be added to your collection! </h1>
      <form className="py-2 text-center" onSubmit={this.handlePost}>
        <h3>Title </h3>
        <input type="text" name="title" className="w-50" placeholder="Title"></input>
        <h3> Prep Time </h3>
        <input type="text" name="prep_time" className="w-50" placeholder="Prep Time"></input>
        <h3> Ingredients </h3>
        <input type="text" name="ingredients" className="w-50"placeholder="Ingredients"></input>
        <h3>Instructions </h3>
        <textarea type="text" name="instructions" className="w-50" placeholder="Instructions"></textarea>
        <h3> Image URL (if any) </h3>
        <input type="text" name="image" className="w-50" placeholder="Image URL"></input>
        <h3> Story </h3>
        <input type="text" name="story" className="w-50" placeholder="Story"></input>
          <br></br>
        <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
    </div>
    );
  }
}
 
export default PostRecipe;