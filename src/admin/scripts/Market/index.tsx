import React from 'react';
import { Switch } from 'react-router-dom';

import routes from '../config.routes';

import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';
import ProductsPage from './page/Products';

const Market: React.FC<{}> = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[
						routes.market.products.path,
						routes.market.products.pathDetail + '/:id',
					]}
					component={ProductsPage}
					auth={routes.market.products.auth}
					exact
				/>

				<AuthRoute
					path={routes.market.dashboard.path}
					component={DashboardPage}
					auth={routes.market.dashboard.auth}
					exact
				/>
			</Switch>
		</>
	);
};

export default Market;
