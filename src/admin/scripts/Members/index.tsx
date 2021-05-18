import React from 'react';
import { Switch } from 'react-router-dom';

import routes from '../config.routes';

import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';
import MembersPage from './page/Members';

const Members: React.FC<{}> = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[
						routes.members.members.path,
						routes.members.members.pathDetail + '/:id',
					]}
					component={MembersPage}
					auth={routes.members.members.auth}
					exact
				/>

				<AuthRoute
					path={routes.members.dashboard.path}
					component={DashboardPage}
					auth={routes.members.dashboard.auth}
					exact
				/>
			</Switch>
		</>
	);
};

export default Members;
