import React from 'react';

import routes from '../../Market/routes.json';
import Navigation from './Navigation';

const links = [
	{
		key: 1,
		label: routes.dashboard.label,
		path: routes.dashboard.path,
		active: true,
	},
	{
		key: 2,
		label: routes.products.label,
		path: routes.products.path,
		active: true,
	},
];

interface NavigationMarketProps {
	sidebarToggle: Function;
}

const NavigationMarket: React.FC<NavigationMarketProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={links} sidebarToggle={sidebarToggle} />;
};

export default NavigationMarket;
