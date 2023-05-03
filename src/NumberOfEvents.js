import React, { Component } from 'react';


class NumberOfEvents extends Component {
  state = {
    default: 32,
    query: ''
  }

  render() {
    return (
      <input 
        className='numberOfEvents'
        type='number'
        value={this.state.query}
      >
      </input>
    )
  }
}

export default NumberOfEvents;