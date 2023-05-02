import React, { Component } from "react";

class Event extends Component {
  state = {collapsed: true};

  render() {
    const { event } = this.props;
    return <div className='event'>
      <h2 className='title'>{event.summary}</h2>
      <p className='time'>{`${event.start.dateTime} (${event.start.timeZone})`}</p>
      <p className='location'>{`@${event.summary} | ${event.location}`}</p>
      <button className='details'>Show details</button>
    </div>;
  }
}

export default Event;