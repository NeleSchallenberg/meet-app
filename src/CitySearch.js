import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
	state = {
		query: '',
		suggestions: [],
		showSuggestions: undefined,
		infoText: '',
	};

	handleInputChanged = (event) => {
		const value = event.target.value;
		this.setState({ showSuggestions: true });
		const suggestions = this.props.locations.filter((location) => {
			return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
		});
		if (suggestions.length === 0) {
			this.setState({
				query: value,
				showSuggestions: false,
				infoText:
					'We can not find the city you are looking for. Please try another one.',
			});
		} else {
			return this.setState({
				query: value,
				suggestions,
				infoText: '',
			});
		}
	};

	handleItemClicked = (suggestion) => {
		this.setState({
			query: suggestion,
			suggestions: [],
			showSuggestions: false,
			infoText: '',
		});
		this.props.updateEvents(suggestion);
	};

	render() {
		return (
			<div className='city-search'>
				<h2>Choose your nearest city</h2>
				<input
					aria-labelledby='city search'
					type='text'
					className='city'
					value={this.state.query}
					onChange={this.handleInputChanged}
					onFocus={() => {
						this.setState({ showSuggestions: true });
					}}
				/>
				<ul
					className='suggestions'
					style={
						this.state.showSuggestions ? {} : { display: 'none' }
					}>
					{this.state.suggestions.map((suggestion) => (
						<li
							key={suggestion}
							onClick={() => this.handleItemClicked(suggestion)}>
							{suggestion}
						</li>
					))}
					<li onClick={() => this.handleItemClicked('all')}>
						<b>See all cities</b>
					</li>
				</ul>
				<InfoAlert text={this.state.infoText} />
			</div>
		);
	}
}

export default CitySearch;
