import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

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