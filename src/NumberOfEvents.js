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
			this.setState({
				errorText: 'Select number from 1 to 32',
			});
		} else {
			return this.setState({
				errorText: '',
			});
		}
	};

	render() {
		return (
			<div>
				<h3>Number of events:</h3>
				<input
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
