import React from 'react';
import { Switch } from 'react-router-dom';

import routes from '../config.routes';

import { ROUTE_PATH_ATTR_ID } from '../constants';
import AuthRoute from '../utils/AuthRoute';
import DashboardPage from './page/Dashboard';
import ProductsPage from './page/Products';
import DeliveriesPage from './page/Deliveries';
import DistributorsPage from './page/Distributors';
import PaymentsPage from './page/Payments';
import ProducersPage from './page/Producers';
import StoresPage from './page/Stores';

const Market: React.FC<{}> = () => {
	return (
		<>
			<Switch>
				<AuthRoute
					path={[
						routes.market.products.path,
						routes.market.products.pathDetail + ROUTE_PATH_ATTR_ID,
					]}
					component={ProductsPage}
					auth={routes.market.products.auth}
					exact
				/>

				<AuthRoute
					path={[
						routes.market.deliveries.path,
						routes.market.deliveries.pathDetail + ROUTE_PATH_ATTR_ID,
					]}
					component={DeliveriesPage}
					auth={routes.market.deliveries.auth}
					exact
				/>

				<AuthRoute
					path={[
						routes.market.distributors.path,
						routes.market.distributors.pathDetail + ROUTE_PATH_ATTR_ID,
					]}
					component={DistributorsPage}
					auth={routes.market.distributors.auth}
					exact
				/>

				<AuthRoute
					path={[
						routes.market.payments.path,
						routes.market.payments.pathDetail + ROUTE_PATH_ATTR_ID,
					]}
					component={PaymentsPage}
					auth={routes.market.payments.auth}
					exact
				/>

				<AuthRoute
					path={[
						routes.market.producers.path,
						routes.market.producers.pathDetail + ROUTE_PATH_ATTR_ID,
					]}
					component={ProducersPage}
					auth={routes.market.producers.auth}
					exact
				/>

				<AuthRoute
					path={[
						routes.market.stores.path,
						routes.market.stores.pathDetail + ROUTE_PATH_ATTR_ID,
					]}
					component={StoresPage}
					auth={routes.market.stores.auth}
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
