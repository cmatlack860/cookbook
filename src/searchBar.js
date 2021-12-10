import React, { Component } from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  handleSearchText = e => {
    e.preventDefault();
    var search = e.target.elements.searchText.value;
    this.props.handleSearch(search);
  }

  render() { 
    return (
      <div>
        <form onSubmit={this.handleSearchText}>
          <input type='text' name='searchText' placeholder='Search' /><button type='submit' className='btn-primary m-2'>Search</button>
        </form>
      </div>
    );
  }
}
 
export default SearchBar;