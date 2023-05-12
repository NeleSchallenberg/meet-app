import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

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

	getData = () => {
		const { locations, events } = this.state;
		const data = locations.map((location) => {
			const number = events.filter(
				(event) => event.location === location
			).length;
			const city = location.split(', ').shift();
			return { city, number };
		});
		return data;
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
				<ScatterChart
					width={730}
					height={250}
					margin={{
						top: 20,
						right: 20,
						bottom: 10,
						left: 10,
					}}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='x' type='number' name='stature' unit='cm' />
					<YAxis dataKey='y' type='number' name='weight' unit='kg' />
					<ZAxis
						dataKey='z'
						type='number'
						range={[64, 144]}
						name='score'
						unit='km'
					/>
					<Tooltip cursor={{ strokeDasharray: '3 3' }} />
					<Legend />
					<Scatter name='A school' data={data01} fill='#8884d8' />
					<Scatter name='B school' data={data02} fill='#82ca9d' />
				</ScatterChart>
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
