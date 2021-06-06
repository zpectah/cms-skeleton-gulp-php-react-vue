import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import { GlobalStyles } from '../styles/global';
import ThemeService from '../service/ThemeService';
import HelpService from '../service/HelpService';
import themes from '../styles/theme';
import routes from '../config.routes';

import AuthRoute from '../utils/AuthRoute';
import Error404Page from './page/Error404';
import DashboardPage from './page/Dashboard';
import LoginPage from './page/Login';
import LostPasswordPage from './page/LostPassword';
import PostsPage from './page/Posts';
import UsersPage from './page/Users';
import SettingsPage from './page/Settings';
import TagsPage from './page/Tags';
import TranslationsPage from './page/Translations';
import CategoriesPage from './page/Categories';
import PagesPage from './page/Pages';
import UploadsPage from './page/Uploads';
import MenuPage from './page/MenuPage';
import MessagesPage from './page/Messages';
import Members from '../Members';
import Market from '../Market';
import {
	ROUTE_PATH_ATTR_ID,
	ROUTE_PATH_ATTR_PANEL,
	ROUTE_PATH_ATTR_TOKEN,
} from '../constants';

const App = () => {
	const store = useSelector((store: any) => store);
	const [theme, setTheme] = useState(themes['default']);

	useEffect(() => {
		onInit();

		return () => {};
	}, []);

	useEffect(() => {
		if (store.ui.theme) setTheme(themes[store.ui.theme]);
	}, [store.ui.theme]);

	const onInit = () => {
		ThemeService.init();
		HelpService.init();
	};

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Router>
				<Switch>
					<AuthRoute
						path={['/admin/members']}
						component={Members}
						auth={routes.app.dashboard.auth}
					/>

					<AuthRoute
						path={['/admin/market']}
						component={Market}
						auth={routes.app.dashboard.auth}
					/>

					<Route
						path={[
							routes.app['lost-password'].path,
							routes.app['lost-password'].path + ROUTE_PATH_ATTR_TOKEN,
						]}
						component={LostPasswordPage}
						exact
					/>

					<Route path={routes.app.login.path} component={LoginPage} />

					<AuthRoute
						path={[
							routes.app.settings.path,
							routes.app.settings.path + ROUTE_PATH_ATTR_PANEL,
						]}
						component={SettingsPage}
						auth={routes.app.settings.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.posts.path,
							routes.app.posts.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={PostsPage}
						auth={routes.app.posts.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.categories.path,
							routes.app.categories.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={CategoriesPage}
						auth={routes.app.categories.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.translations.path,
							routes.app.translations.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={TranslationsPage}
						auth={routes.app.translations.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.users.path,
							routes.app.users.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={UsersPage}
						auth={routes.app.users.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.tags.path,
							routes.app.tags.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={TagsPage}
						auth={routes.app.tags.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.uploads.path,
							routes.app.uploads.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={UploadsPage}
						auth={routes.app.uploads.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.pages.path,
							routes.app.pages.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={PagesPage}
						auth={routes.app.pages.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.menu.path,
							routes.app.menu.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={MenuPage}
						auth={routes.app.menu.auth}
						exact
					/>

					<AuthRoute
						path={[
							routes.app.messages.path,
							routes.app.messages.pathDetail + ROUTE_PATH_ATTR_ID,
						]}
						component={MessagesPage}
						auth={routes.app.messages.auth}
						exact
					/>

					<AuthRoute
						path={routes.app.dashboard.path}
						component={DashboardPage}
						auth={routes.app.dashboard.auth}
						exact
					/>

					<Route component={Error404Page} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
