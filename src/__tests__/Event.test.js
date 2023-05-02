import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe('<Event /> component', () => {
  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />)
  })

  test('render event component', () => {
    expect(EventWrapper).toBeDefined();
  })

  test('render event summary as title', () => {
    const title = EventWrapper.find('.title');
    expect(title).toHaveLength(1);
    expect(title.text()).toBe(event.summary);
    
  })


  // test('event is collapsed by default', () => {
  //   expect(EventWrapper.state('collapsed')).toBe(true);
  // })

  // test('render event information while collapsed', () => {
    
  // })

  // test('render event details correctly when expanded', () => {
    
  // })

})