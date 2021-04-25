import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { SWRConfig } from 'swr';
import './i18n';
import App from './App';
import api from './utils/api';

const fetcher = api.fetcher;

ReactDOM.render(
	<Provider store={store}>
		<SWRConfig value={{ fetcher }}>
			<App />
		</SWRConfig>
	</Provider>,
	document.getElementById('App'),
);
