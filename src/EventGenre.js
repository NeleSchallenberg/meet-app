import React, { useEffect, useState } from 'react';
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Legend,
	PolarAngleAxis,
	Tooltip,
	Cell,
} from 'recharts';

const EventGenre = ({ events }) => {
	const [data, setData] = useState([]);
	console.log(localStorage.getItem('locations'));
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

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']; // add more colors if needed

	return (
		<ResponsiveContainer height={350}>
			<PieChart>
				<Pie
					data={data}
					dataKey='value'
					nameKey='name'
					cx='50%'
					cy='50%'
					outerRadius={100}
					label>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenre;
