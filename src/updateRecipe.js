import React, { Component } from 'react';
import axios from 'axios';

class UpdateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate = e => {
    console.log(this.state);
    e.preventDefault();
    var data = {
      prep_time: e.target.elements.prep_time.value,
      ingredients: e.target.elements.ingredients.value,
      instructions: e.target.elements.instructions.value,
      image: e.target.elements.image.value,
      story: e.target.elements.story.value
    };
    // this.props.handleUpdateState(data);
    axios
      .put('http://localhost:5002/recipes/' + this.props.match.params._id, data)
      .then((res) => {
        console.log(res);
        ;
    })
      .catch(err => console.log(err));
  };

  render() { 
    console.log(this.state);
    return (
    <div>
      <h2>Update the details of your recipe {this.props.title} below</h2>
      <form className="py-2" onSubmit={this.handleUpdate}>
          <h3> Prep Time </h3>
          <input type="text" name="prep_time" className="w-50" placeholder="Prep Time"></input>
          <h3> Ingredients </h3>
          <input type="text" name="ingredients" className="w-50" placeholder="Ingredients"></input>
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
 
export default UpdateRecipe;