import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';

class App extends Component {
	state = {
		events: [],
		locations: [],
		numberOfEvents: 32,
		selectedCity: 'all',
		offlineText: '',
	};

	componentDidMount() {
		this.mounted = true;
		getEvents().then((events) => {
			if (this.mounted) {
				this.setState({ events, locations: extractLocations(events) });
			}
		});
	}
	componentWillUnmount() {
		this.mounted = false;
	}

	updateEvents = (location, numberOfEvents) => {
		if (!numberOfEvents) numberOfEvents = this.state.numberOfEvents;

		getEvents().then((events) => {
			const locationEvents =
				location === 'all'
					? events
					: events.filter((event) => event.location === location);
			const eventsToShow = locationEvents.slice(0, numberOfEvents);
			this.setState({
				events: eventsToShow,
				selectedCity: location,
			});
		});

		if (!navigator.onLine) {
			this.setState({
				offlineText:
					'You seem to be offline! Events are loaded from the chache.',
			});
		} else {
			this.setState({
				offlineText: '',
			});
		}
	};

	countEvent = (numberOfEvents) => {
		this.setState({
			numberOfEvents: numberOfEvents,
		});
		this.updateEvents(this.state.selectedCity, numberOfEvents);
	};

	render() {
		return (
			<div className='app'>
				<OfflineAlert
					className='offline-alert'
					text={this.state.offlineText}
				/>
				<h1>Meet App</h1>
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents
					numberOfEvents={this.state.numberOfEvents}
					countEvent={this.countEvent}
				/>
				<EventList events={this.state.events} />
			</div>
		);
	}
}

export default App;
