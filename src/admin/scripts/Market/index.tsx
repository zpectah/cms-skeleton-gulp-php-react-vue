import React from 'react';
import { Switch } from 'react-router-dom';

import routes from './routes.json';

import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';
import ProductsPage from './page/Products';

const Market: React.FC<{}> = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[routes.products.path, routes.products.pathDetail + '/:id']}
					component={ProductsPage}
					auth={routes.products.auth}
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

export default Market;
