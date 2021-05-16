import React from 'react';
import { Switch } from 'react-router-dom';

import routes from './routes.json';

import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';
import MembersPage from './page/Members';

const Members: React.FC<{}> = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[routes.members.path, routes.members.pathDetail + '/:id']}
					component={MembersPage}
					auth={routes.members.auth}
					exact
				/>

				<AuthRoute
					path={routes.dashboard.path}
					component={DashboardPage}
					auth={routes.dashboard.auth}
					exact
				/>
			</Switch>
		</>
	);
};

export default Members;
