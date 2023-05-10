import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as atatus from 'atatus-spa';
atatus.config('2da78df8156940c9bf94559306ee531d').install();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
