import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    default: 32,
    query: ''
  }

  handleChange = event => {
    let inputValue = event.target.value;
    this.setState({ query: inputValue });
  }

  render() {
    return (
      <input 
        className='numberOfEvents'
        type='number'
        value={this.state.query}
        onChange={this.handleChange}
      />
    )
  }
}

export default NumberOfEvents;