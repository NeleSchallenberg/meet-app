import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

class App extends Component {
	state = {
		events: [],
		locations: [],
		showWelcomeScreen: undefined,
		numberOfEvents: 32,
		selectedCity: 'all',
		offlineText: '',
	};

	async componentDidMount() {
		this.mounted = true;
		const accessToken = localStorage.getItem('access_token');
		const isTokenValid = (await checkToken(accessToken)).error
			? false
			: true;
		const searchParams = new URLSearchParams(window.location.search);
		const code = searchParams.get('code');
		this.setState({ showWelcomeScreen: !(code || isTokenValid) });
		if ((code || isTokenValid) && this.mounted) {
			getEvents().then((events) => {
				if (this.mounted) {
					this.setState({
						events,
						locations: extractLocations(events),
					});
				}
			});
		}
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
		if (this.state.showWelcomeScreen === undefined)
			return <div className='app' />;
		return (
			<div className='app'>
				<OfflineAlert
					className='offline-alert'
					text={this.state.offlineText}
				/>
				<h1>Meet App</h1>
				<h4 className='subtitle'>
					Find upcoming events around the world for full-stack
					developers.
				</h4>
				<CitySearch
					locations={this.state.locations}
					updateEvents={this.updateEvents}
				/>
				<NumberOfEvents
					numberOfEvents={this.state.numberOfEvents}
					countEvent={this.countEvent}
				/>
				<EventList events={this.state.events} />
				<WelcomeScreen
					showWelcomeScreen={this.state.showWelcomeScreen}
					getAccessToken={() => {
						getAccessToken();
					}}
				/>
			</div>
		);
	}
}

export default App;
