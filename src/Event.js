import React, { Component } from "react";

class Event extends Component {
  state = {collapsed: true};
  
  render() {
    const { event } = this.props;
    return <div className="event">
      <h2 className='title'>{event.summary}</h2>
    </div>;
  }
}

export default Event;