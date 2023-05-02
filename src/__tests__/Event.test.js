import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe('<Event /> component', () => {
  let EventWrapper, event;
  beforeAll(() => {
    event = mockData;
    EventWrapper = shallow(<Event />)
  })

  test('render event component', () => {
    expect(EventWrapper).toBeDefined();
  })

  // test('render event title', () => {
    
  // })

  // test('render event information while collapsed', () => {
    
  // })

  // test('render event details correctly when expanded', () => {
    
  // })

})