import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
	let NumberOfEventsWrapper;
	beforeAll(() => {
		NumberOfEventsWrapper = shallow(
			<NumberOfEvents countEvent={() => {}} numberOfEvents={() => {}} />
		);
	});

	test("render number input field", () => {
		expect(NumberOfEventsWrapper.find(".numberOfEvents")).toHaveLength(1);
	});

	test("render 32 as default value for number of events", () => {
		expect(NumberOfEventsWrapper.find(".numberOfEvents").prop("type")).toBe(
			"number"
		);
		expect(NumberOfEventsWrapper.state("query")).toBe(32);
	});

	test("render user input correctly", () => {
		const query = NumberOfEventsWrapper.state("query");
		expect(
			NumberOfEventsWrapper.find(".numberOfEvents").prop("value")
		).toBe(query);
	});

	test("change state when number input changes", () => {
		expect(NumberOfEventsWrapper.state("query")).toBe(32);
		const inputValue = { target: { value: 5 } };
		NumberOfEventsWrapper.find(".numberOfEvents").simulate(
			"change",
			inputValue
		);
		expect(NumberOfEventsWrapper.state("query")).toBe(5);
	});
});
