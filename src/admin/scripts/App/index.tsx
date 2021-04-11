import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import routes from './routes.json';
import ThemeService from '../service/ThemeService';
import { loadSettings } from '../store/App/actions';
import { getStyles } from '../styles/theme';

import AuthRoute from '../utils/AuthRoute';
import Error404Page from './page/Error404';
import DashboardPage from './page/Dashboard';
import LoginPage from './page/Login';
import LostPasswordPage from './page/LostPassword';
import PostsPage from './page/Posts';
import UsersPage from './page/Users';
import SettingsPage from './page/Settings';
import TagsPage from './page/Tags';
import { withTranslation } from 'react-i18next';

const GlobalStyle = createGlobalStyle`
	html {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: 16px;
	}
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: 1rem;

		& > .app {
			width: 100%;
			height: 100%;
			color: ${getStyles().layout.body_text};
			background-color: ${getStyles().layout.body_bg};
		}
	}

	// Modal dialog blur background
	.DialogCover {
		&:last-of-type {
			backdrop-filter: blur(3px);
		}
	}

`;

interface AppProps {}

interface AppState {
	auth: boolean;
}

class App extends Component<AppProps & { dispatch: Function }, AppState> {
	static props: AppProps;

	state: AppState = {
		auth: false,
	};

	componentDidMount() {
		ThemeService.init();
		this.props.dispatch(loadSettings());
	}

	render() {
		return (
			<>
				<GlobalStyle />
				<Router>
					<Switch>
						<Route
							path={[
								routes['lost-password'].path,
								routes['lost-password'].path + '/token/:token',
							]}
							component={LostPasswordPage}
							exact
						/>

						<Route path={routes.login.path} component={LoginPage} />

						<AuthRoute
							path={[routes.settings.path, routes.settings.path + '/:panel']}
							component={SettingsPage}
							auth={routes.settings.auth}
							exact
						/>

						<AuthRoute
							path={[routes.posts.path, routes.posts.pathDetail + '/:id']}
							component={PostsPage}
							auth={routes.posts.auth}
							exact
						/>

						<AuthRoute
							path={[routes.users.path, routes.users.pathDetail + '/:id']}
							component={UsersPage}
							auth={routes.users.auth}
							exact
						/>

						<AuthRoute
							path={[routes.tags.path, routes.tags.pathDetail + '/:id']}
							component={TagsPage}
							auth={routes.tags.auth}
							exact
						/>

						<AuthRoute
							path={routes.dashboard.path}
							component={DashboardPage}
							auth={routes.dashboard.auth}
							exact
						/>

						<Route component={Error404Page} />
					</Switch>
				</Router>
			</>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App);
