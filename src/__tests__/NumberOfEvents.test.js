import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render number input field', () => {
    expect(NumberOfEventsWrapper.find('input.number')).toHaveLength(1);
  });

  test('render 32 as default value for number of events', () => {
    expect(NumberOfEventsWrapper.find('input.number').prop('type')).toBe('number');
    expect(NumberOfEventsWrapper.state('number')).toBe(32);
    
  })
});