import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    query: 10
  };

  handleChange = event => {
    let inputValue = event.target.value;
    this.props.updateEvents(null, inputValue);
    this.setState({ query: inputValue });
  };

  render() {
    return (
      <div>
        <h3>Number of events:</h3>
        <input 
          className='numberOfEvents'
          type='number'
          min={1}
          value={this.state.query}
          onChange={this.handleChange}
        />
      </div>
    )
  }
};

export default NumberOfEvents;