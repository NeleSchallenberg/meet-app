import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";

describe("<CitySearch /> component", () => {
	let locations, CitySearchWrapper;
	beforeAll(() => {
		locations = extractLocations(mockData);
		CitySearchWrapper = shallow(
			<CitySearch locations={locations} updateEvents={() => {}} />
		);
	});

	// TEST SCENARIO 2: User should see a list of suggestions when they search for a city
	test("render text input field", () => {
		expect(CitySearchWrapper.find("input.city")).toHaveLength(1);
	});

	test("render a list of suggestions", () => {
		expect(CitySearchWrapper.find("ul.suggestions")).toHaveLength(1);
	});

	test("render user input correctly", () => {
		const query = CitySearchWrapper.state("query");
		expect(CitySearchWrapper.find("input.city").prop("value")).toBe(query);
	});

	test("change state when text input changes", () => {
		CitySearchWrapper.setState({
			query: "Munich",
		});
		const eventObject = { target: { value: "Berlin" } };
		CitySearchWrapper.find("input.city").simulate("change", eventObject);
		expect(CitySearchWrapper.state("query")).toBe("Berlin");
	});

	test("render list of suggestions correctly", () => {
		const locations = extractLocations(mockData);
		CitySearchWrapper.setState({ suggestions: locations });
		const suggestions = CitySearchWrapper.state("suggestions");
		expect(CitySearchWrapper.find("ul.suggestions li")).toHaveLength(
			suggestions.length + 1
		);
		for (let i = 0; i < suggestions.length; i += 1) {
			expect(
				CitySearchWrapper.find("ul.suggestions li").at(i).text()
			).toBe(suggestions[i]);
		}
	});

	test("suggestion list match the query when changed", () => {
		CitySearchWrapper.setState({ query: "", suggestions: [] });
		CitySearchWrapper.find("input.city").simulate("change", {
			target: { value: "Berlin" },
		});
		const query = CitySearchWrapper.state("query");
		const filteredLocations = locations.filter((location) => {
			return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
		});
		expect(CitySearchWrapper.state("suggestions")).toEqual(
			filteredLocations
		);
	});

	// TEST SCENARIO 3: User can select a city from the suggested list
	test("selecting a suggestion should change query state", () => {
		CitySearchWrapper.setState({
			query: "Berlin",
		});
		const suggestions = CitySearchWrapper.state("suggestions");
		CitySearchWrapper.find("ul.suggestions li").at(0).simulate("click");
		expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
	});

	test("selecting CitySearch input reveals the suggestions list", () => {
		CitySearchWrapper.find("input.city").simulate("focus");
		expect(CitySearchWrapper.state("showSuggestions")).toBe(true);
		expect(
			CitySearchWrapper.find("ul.suggestions").prop("style")
		).not.toEqual({
			display: "none",
		});
	});

	test("selecting a suggestion should hide the suggestions list", () => {
		CitySearchWrapper.setState({
			query: "Berlin",
			showSuggestions: undefined,
		});
		CitySearchWrapper.find("ul.suggestions li").at(0).simulate("click");
		expect(CitySearchWrapper.state("showSuggestions")).toBe(false);
		expect(CitySearchWrapper.find("ul.suggestions").prop("style")).toEqual({
			display: "none",
		});
	});
});
