import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

// UNIT TESTS
describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />)
  });

  // TEST SCENARIO 1: When user hasn't searched for a city, show upcoming events from all cities
  test('render city search component', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render number of events component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

});

// INTEGRATION TEST
describe('<App /> integration', () => {

  test('app passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

});