import React from 'react';
import { BrowserRouter as Switch, Link } from 'react-router-dom';
import axios from 'axios';

class UpdateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate = e => {
    e.preventDefault();
    var data = {
      title: this.props.recipe.title,
      prep_time: e.target.elements.prep_time.value,
      ingredients: e.target.elements.ingredients.value,
      instructions: e.target.elements.instructions.value,
      image: e.target.elements.image.value,
      story: e.target.elements.story.value
    };
    axios
      .put('http://localhost:5002/recipes/' + this.props.id, data)
      .then((res) => {
        console.log(data);
        this.props.handleUpdateState(data);
    })
      .catch(err => console.log(err));
    this.props.history.push('/recipes/' + this.props.id);
  };

  render() { 
    return (

      <div>
        <Link to={'/recipes/' + this.props.id} className='btn backBtn mt-3'>Back</Link>
        <h2>Update the details of your recipe {this.props.title} below</h2>
        <form className="py-2" onSubmit={this.handleUpdate}>
            <h3> Prep Time </h3>
            <input type="text" name="prep_time" className="w-50" placeholder="Prep Time" defaultValue={this.props.recipe.prep_time} ></input>
            <h3> Ingredients </h3>
            <input type="text" name="ingredients" className="w-50" placeholder="Ingredients" defaultValue={this.props.recipe.ingredients}></input>
            <h3>Instructions </h3>
            <textarea type="text" name="instructions" className="w-50" placeholder="Instructions" defaultValue={this.props.recipe.instructions}></textarea>
            <h3> Image URL (if any) </h3>
            <input type="text" name="image" className="w-50" placeholder="Image URL" defaultValue={this.props.recipe.image}></input>
            <h3> Story </h3>
            <input type="text" name="story" className="w-50" placeholder="Story" defaultValue={this.props.recipe.story}></input>
              <br></br>
            <button type="submit" className="btn btn-secondary mt-3">Submit</button>
          </form>
      </div>

    );
  }
}
 
export default UpdateRecipe;