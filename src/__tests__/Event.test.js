import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';

describe('<Event /> component', () => {
  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />)
  })

  // TEST SCENARIO 1: An event element is collapsed by default

  test('render event component', () => {
    expect(EventWrapper).toBeDefined();
  })

  test('event is collapsed by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  })

  test('render event summary as title', () => {
    const title = EventWrapper.find('.title');
    expect(title).toHaveLength(1);
    expect(title.text()).toBe(event.summary);
  })

  test('render event start time when collapsed', () => {
    const time = EventWrapper.find('.time');
    expect(time).toHaveLength(1);
    expect(time.text()).toBe(`${event.start.dateTime} (${event.start.timeZone})`);
  })

  test('render event location when collapsed', () => {
    const location = EventWrapper.find('.location');
    expect(location).toHaveLength(1);
    expect(location.text()).toBe(`@${event.summary} | ${event.location}`);
  })

  test('render button to show details when collapsed', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
    const detailsButton = EventWrapper.find('.details');
    expect(detailsButton).toHaveLength(1);
    expect(detailsButton.text()).toBe('Show details');
  })

  // TEST SCENARIO 2: User can expand an event to see its details

  test('expand details when button is clicked', () => {
    const detailsButton = EventWrapper.find('.details');
    expect(detailsButton.text()).toBe('Show details');
    detailsButton.simulate('click');
    EventWrapper.setState({ collapsed: false});
  })

  test('render details when expanded', () => {
    expect(EventWrapper.state('collapsed')).toBe(false);
    const about = EventWrapper.find('.about');
    const link = EventWrapper.find('.link');
    const description = EventWrapper.find('.description');
    const detailsButton = EventWrapper.find('.details');

    expect(about).toHaveLength(1);
    expect(about.text()).toBe('About event:');
    expect(link).toHaveLength(1);
    expect(link.text()).toBe('See details on Google Calendar');
    expect(description).toHaveLength(1);
    expect(description.text()).toBe(event.description);
    expect(detailsButton.text()).toBe('Hide details');
  })
 
  test('collapse details when button is clicked', () => {
    expect(EventWrapper.state('collapsed')).toBe(false);
    const detailsButton = EventWrapper.find('.details');
    expect(detailsButton.text()).toBe('Hide details');
    detailsButton.simulate('click');
    EventWrapper.setState({ collapsed: true});
  })
})