import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
	let AppWrapper;

	test("When user has not specified a number, 32 is the default number", ({
		given,
		when,
		then,
	}) => {
		given("user has not specified a number of events", () => {});
		when("the user receives a list of events", () => {
			AppWrapper = mount(<App />);
		});
		then("the user should see 32 events by default", () => {
			expect(AppWrapper.state("numberOfEvents")).toEqual(32);
		});
	});

	test("User can change the number of events they want to see", ({
		given,
		when,
		then,
	}) => {
		given("user is seeing 32 events by default", () => {
			expect(AppWrapper.state("numberOfEvents")).toEqual(32);
		});
		let selectedNumber = Math.floor(Math.random() * 32);
		when("the user specifies the number of events", () => {
			AppWrapper.update();
			let NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
			NumberOfEventsWrapper.find(".numberOfEvents").simulate(
				"change",
				selectedNumber
			);
		});
		then(
			"the user should see the desired number of events on screen",
			() => {
				AppWrapper.update();
				expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
			}
		);
	});
});
