import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    
    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('user received a list with upcoming events', () => {
        });
        when('the user scrolls through the list of events', () => {
            AppWrapper = mount(<App />);
        });
        then('the user should see all event elements without their details', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('a list of collapsed event elements is displayed', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
        });
        when('the user clicks on the button to show details', () => {
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
        });
        then('the user should see the event element expanding and showing the events details', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .event-details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        given('user has expanded an event to see the details', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(1);
        });
        when('the user clicks on the button to hide details', () => {
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
        });
        then('the user should see the event collapsing and hiding the details', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
        });
    });

});