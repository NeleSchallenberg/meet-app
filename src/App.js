import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import './nprogress.css';
import { OfflineAlert } from './Alert';
// import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import { getEvents, extractLocations, checkToken } from './api';
// import { getAccessToken } from './api';
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
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
		// if ((code || isTokenValid) && this.mounted) {
		getEvents().then((events) => {
			if (this.mounted) {
				this.setState({
					events,
					locations: extractLocations(events),
				});
			}
		});
		// }
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

	componentWillUnmount() {
		this.mounted = false;
	}

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
				<div className='data-vis-wrapper'>
					<EventGenre events={this.state.events} />
					<ResponsiveContainer height={400}>
						<ScatterChart
							width={1200}
							height={250}
							margin={{
								top: 20,
								right: 20,
								bottom: 10,
								left: 10,
							}}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='city' type='category' name='city' />
							<YAxis
								dataKey='number'
								type='number'
								name='number of events'
							/>

							<Tooltip cursor={{ strokeDasharray: '3 3' }} />

							<Scatter data={this.getData()} fill='#8884d8' />
						</ScatterChart>
					</ResponsiveContainer>
				</div>
				<EventList events={this.state.events} />
				{/* <WelcomeScreen
					showWelcomeScreen={this.state.showWelcomeScreen}
					getAccessToken={() => {
						getAccessToken();
					}}
				/> */}
			</div>
		);
	}
}

export default App;
