import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import routes from './routes.json';
import ThemeService from '../service/ThemeService';
import globalStyles from '../styles/global';
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

const GlobalStyle = createGlobalStyle`
	${globalStyles}

	body {
		color: ${getStyles().layout.body_text};
		background-color: ${getStyles().layout.body_bg};
	}
`;

const App = () => {
	const [auth, setAuth] = useState<boolean>(false);

	useEffect(() => {
		onInit();

		return () => null;
	}, []);

	const onInit = () => {
		ThemeService.init();
	};

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
};

export default App;
