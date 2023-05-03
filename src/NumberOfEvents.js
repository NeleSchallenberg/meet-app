import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    default: 32,
    query: ''
  };

  handleChange = event => {
    let inputValue = event.target.value;
    this.setState({ query: inputValue });
  };

  render() {
    return (
      <div className='event-amount'>
        <input 
          className='amount'
          type='number'
          value={this.state.query}
          onChange={this.handleChange}
        />
      </div>
    )
  }
};

export default NumberOfEvents;