import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
	state = {
		query: 32,
		errorText: '',
	};

	handleChange = (event) => {
		let inputValue = event.target.value;
		this.props.countEvent(inputValue);
		this.setState({ query: inputValue });
		if (inputValue < 1) {
			return this.setState({
				errorText: 'Select a number from 1 to 32.',
			});
		} else if (inputValue > 32) {
			return this.setState({
				errorText: 'Select a number from 1 to 32.',
			});
		} else {
			return this.setState({
				errorText: '',
			});
		}
	};

	render() {
		return (
			<div className='number-element'>
				<h2 className='number-label'>Number of events:</h2>
				<input
					aria-labelledby='number of events'
					className='numberOfEvents'
					type='number'
					min={1}
					max={32}
					value={this.state.query}
					onChange={this.handleChange}
				/>
				<ErrorAlert text={this.state.errorText} />
			</div>
		);
	}
}

export default NumberOfEvents;
