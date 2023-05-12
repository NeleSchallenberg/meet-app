import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

const EventGenre = ({ events }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(() => {
			const genres = [
				'React',
				'JavaScript',
				'Node',
				'jQuery',
				'AngularJS',
			];
			const data = genres.map((genre) => {
				const value = events.filter(({ summary }) =>
					summary.split(' ').includes(genre)
				).length;
				return { name: genre, value };
			});
			return data;
		});
	}, [events]);

	// function getData() {
	// 	const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
	// 	const data = genres.map((genre) => {
	// 		const value = events.filter(({ summary }) =>
	// 			summary.split(' ').includes(genre)
	// 		).length;
	// 		return { name: genre, value };
	// 	});
	// 	return data;
	// }

	return (
		<ResponsiveContainer>
			<PieChart width={730} height={250}>
				<Pie
					data={data}
					dataKey='value'
					nameKey='name'
					cx='50%'
					cy='50%'
					outerRadius={50}
					fill='#8884d8'
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenre;

// import React, { Component } from 'react';
// import { ResponsiveContainer, PieChart, Pie } from 'recharts';

// class EventGenre extends Component {

// 	render() {
// 		const data = [
// 			{ name: 'Group A', value: 400 },
// 			{ name: 'Group B', value: 300 },
// 			{ name: 'Group C', value: 200 },
// 			{ name: 'Group D', value: 100 },
// 		];
// 		return (
// 			<ResponsiveContainer>
// 				<PieChart width={730} height={250}>
// 					<Pie
// 						data={data}
// 						dataKey='value'
// 						nameKey='name'
// 						cx='50%'
// 						cy='50%'
// 						outerRadius={50}
// 						fill='#8884d8'
// 					/>
// 				</PieChart>
// 			</ResponsiveContainer>
// 		);
// 	}
// }

// export default EventGenre;
