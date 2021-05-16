import React from 'react';
import { Switch } from 'react-router-dom';

import routes from './routes.json';

import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';

const Crm: React.FC<{}> = () => {
	return (
		<>
			<Switch>
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
export default Crm;
