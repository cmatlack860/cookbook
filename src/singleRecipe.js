import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UpdateRecipe from './updateRecipe';

class SingleRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
      title: '',
      prep_time: '',
      ingredients: '',
      instructions: '',
      image: '',
      story: ''
    }
  }
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }  

  handleUpdateState(data) {
    this.setState({recipe: data});
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
      let newRecipe = {title: singleTitle, prep_time: singlePreptime, ingredients: singleIng, 
        instructions: singleInst, image: singleImg, story: singleStory}
      this.setState({recipe: newRecipe});
    })
  }
  // conditionally render image tag only if there is image URL there
  render() { 
    return (
      
          <div id='singleRecipe' className='p-3 mt-2'>
            <Link to={'/'} className='btn backBtn'>Back</Link>
            <h2 className='mt-3'> {this.state.recipe.title} </h2>
                <br/>
                <li> Prep Time: {this.state.recipe.prep_time} </li>
                <li> Ingredients: {this.state.recipe.ingredients} </li>
                <li> Instructions: {this.state.recipe.instructions} </li>
                <li> Image: <img src={this.state.recipe.image} width="300px" height="300px" alt=''/> </li>
                <li> Story: {this.state.recipe.story} </li>
            <br></br>
            <Router>
              <h3> Want to edit this recipe? </h3>
                {/* <Route exact path='/edit' component={UpdateRecipe} />  */}
                {/* <Link to={'/edit'} > EDIT {this.state.recipe.title} </Link> */}
                <Link to={'/recipes/' + this.props.match.params._id +'/edit'} className='btn btn-secondary'> Edit {this.state.recipe.title} </Link>
                {/* <Switch><Route exact path='/edit'> <h2>this is filler text</h2> </Route></Switch> */}
                <Route exact path={'/recipes/' + this.props.match.params._id + '/edit'} render={(props)=><UpdateRecipe {...props} id={this.props.match.params._id} recipe={this.state.recipe} handleUpdateState={this.handleUpdateState} />} />
                {/* <Route path={'/edit'} component={UpdateRecipe} /> */}
                {/* <Link to={'/recipes/' + this.props.match.params._id +'/edit'}> Edit {this.state.recipe.title} </Link> */}
                {/* <Route exact path='/recipes/:_id/edit' component={UpdateRecipe} />  */}
            </Router>
          </div>
        
    );
  }
}
 // if you want edit route sepate, make API call with GET request and use that as a seperate page to make updates
export default SingleRecipe;