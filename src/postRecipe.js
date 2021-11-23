import React, { Component } from 'react';


class PostRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      newRecipe = {
        title: '',
        prep_time: '',
        ingredients: '',
        instructions: '',
        image: '',
        story: ''
      }
    }
  post(event) {
    const newTitle = document.getElementById("title").value;
    const newPreptime = document.getElementById("prep_time").value;
    const newIng = document.getElementById("ingredients").value;
    const newInst = document.getElementById("instructions").value;
    const newImage = document.getElementById("image").value;
    const newStory = document.getElementById("story").value;
    console.log('adding a recipe to the database')
    this.props.post()
  };

  this.setState({title: newTitle, prep_time: newPreptime, ingredients: newIng, instructions: newInst, image: newImage, story: newStory})

  render() { 
    return (
    <div>
      <h1 className="text-center"> Post a new recipe to be added to your collection! </h1>
      <form className="py-2">
        <input type="text" name="title" placeholder="Title"></input>
        <input type="text" name="prep_time" placeholder="Prep Time"></input>
        <input type="text" name="ingredients" placeholder="Ingredients"></input>
        <input type="text" name="instructions" placeholder="Instructions"></input>
        <input type="text" name="image" placeholder="Image URL"></input>
        <input type="text" name="story" placeholder="Story"></input>
        <button type="submit" className="btn btn-secondary" onClick={this.post}>Submit</button>
      </form>
    </div>
    );
  }
}
 
export default PostRecipe;