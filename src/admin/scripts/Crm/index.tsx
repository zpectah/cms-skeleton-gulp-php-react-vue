import React from 'react';
import { Switch } from 'react-router-dom';

import routes from './routes.json';

import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';
import CampaignsPage from './page/Campaigns';

const Crm: React.FC<{}> = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[routes.campaigns.path, routes.campaigns.pathDetail + '/:id']}
					component={CampaignsPage}
					auth={routes.campaigns.auth}
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
export default Crm;
