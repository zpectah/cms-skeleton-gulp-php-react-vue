import React from 'react';
import { Switch } from 'react-router-dom';

import routes from '../config.routes';

import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';
import CampaignsPage from './page/Campaigns';

const Crm: React.FC<{}> = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[
						routes.crm.campaigns.path,
						routes.crm.campaigns.pathDetail + '/:id',
					]}
					component={CampaignsPage}
					auth={routes.crm.campaigns.auth}
					exact
				/>

				<AuthRoute
					path={routes.crm.dashboard.path}
					component={DashboardPage}
					auth={routes.crm.dashboard.auth}
					exact
				/>
			</Switch>
		</>
	);
};
export default Crm;
