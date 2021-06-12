import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTE_PATH_ATTR_DETAIL_ID, ROUTES } from '../constants';
import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';
import MembersPage from './page/Members';

const Members: React.FC<{}> = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[
						ROUTES.members.members.path,
						ROUTES.members.members.path + ROUTE_PATH_ATTR_DETAIL_ID,
					]}
					component={MembersPage}
					auth={ROUTES.members.members.auth}
					exact
				/>

				<AuthRoute
					path={ROUTES.members.dashboard.path}
					component={DashboardPage}
					auth={ROUTES.members.dashboard.auth}
					exact
				/>
			</Switch>
		</>
	);
};

export default Members;
