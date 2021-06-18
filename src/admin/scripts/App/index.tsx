import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import {
	ROUTE_PATH_ATTR_DETAIL_ID,
	ROUTE_PATH_ATTR_PANEL,
	ROUTE_PATH_ATTR_TOKEN,
	ROUTES,
} from '../constants';
import { GlobalStyles } from '../styles/global';
import ThemeService from '../service/ThemeService';
import HelpService from '../service/HelpService';
import themes from '../styles/theme';

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
// import CategoriesPage from './page/Categories2';
import PagesPage from './page/Pages';
import UploadsPage from './page/Uploads';
import MenuPage from './page/MenuPage';
import MessagesPage from './page/Messages';
import RequestsPage from './page/Requests';
import Members from '../Members';
import Market from '../Market';

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
						auth={ROUTES.app.dashboard.auth}
					/>

					<AuthRoute
						path={['/admin/market']}
						component={Market}
						auth={ROUTES.app.dashboard.auth}
					/>

					<Route
						path={[
							ROUTES.app['lost-password'].path,
							ROUTES.app['lost-password'].path + ROUTE_PATH_ATTR_TOKEN,
						]}
						component={LostPasswordPage}
						exact
					/>

					<Route path={ROUTES.app.login.path} component={LoginPage} />

					<AuthRoute
						path={[
							ROUTES.app.settings.path,
							ROUTES.app.settings.path + ROUTE_PATH_ATTR_PANEL,
						]}
						component={SettingsPage}
						auth={ROUTES.app.settings.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.posts.path,
							ROUTES.app.posts.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={PostsPage}
						auth={ROUTES.app.posts.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.categories.path,
							ROUTES.app.categories.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={CategoriesPage}
						auth={ROUTES.app.categories.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.translations.path,
							ROUTES.app.translations.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={TranslationsPage}
						auth={ROUTES.app.translations.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.users.path,
							ROUTES.app.users.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={UsersPage}
						auth={ROUTES.app.users.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.tags.path,
							ROUTES.app.tags.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={TagsPage}
						auth={ROUTES.app.tags.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.uploads.path,
							ROUTES.app.uploads.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={UploadsPage}
						auth={ROUTES.app.uploads.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.pages.path,
							ROUTES.app.pages.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={PagesPage}
						auth={ROUTES.app.pages.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.menu.path,
							ROUTES.app.menu.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={MenuPage}
						auth={ROUTES.app.menu.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.messages.path,
							ROUTES.app.messages.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={MessagesPage}
						auth={ROUTES.app.messages.auth}
						exact
					/>

					<AuthRoute
						path={[
							ROUTES.app.requests.path,
							ROUTES.app.requests.path + ROUTE_PATH_ATTR_DETAIL_ID,
						]}
						component={RequestsPage}
						auth={ROUTES.app.requests.auth}
						exact
					/>

					<AuthRoute
						path={ROUTES.app.dashboard.path}
						component={DashboardPage}
						auth={ROUTES.app.dashboard.auth}
						exact
					/>

					<Route component={Error404Page} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
