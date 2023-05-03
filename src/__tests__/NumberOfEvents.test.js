import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  // TEST SCENARIO 1: When user hasn’t specified a number, 32 is the default number
  test('render number input field', () => {
    expect(NumberOfEventsWrapper.find('.amount')).toHaveLength(1);
  });

  test('render 32 as default value for number of events', () => {
    expect(NumberOfEventsWrapper.find('.amount').prop('type')).toBe('number');
    expect(NumberOfEventsWrapper.state('default')).toBe(32);
  });

  // TEST SCENARIO 2: User can change the number of events they want to see.
  test('render user input correctly', () => {
    const query = NumberOfEventsWrapper.state('query');
    expect(NumberOfEventsWrapper.find('.amount').prop('value')).toBe(query);
  });

  test('change state when number input changes', () => {
    expect(NumberOfEventsWrapper.state('default')).toBe(32);
    const inputValue = { target: { value: 10 }};
    NumberOfEventsWrapper.find('.amount').simulate('change', inputValue);
    expect(NumberOfEventsWrapper.state('query')).toBe(10);
  });

});