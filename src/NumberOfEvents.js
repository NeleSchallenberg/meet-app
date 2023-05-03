import React, { Component } from 'react';


class NumberOfEvents extends Component {
  state = {
    number: 32
  }
  
  render() {
    return (
      <input 
        className='number'
        type='number'
      >

      </input>
    )
  }
}

export default NumberOfEvents;