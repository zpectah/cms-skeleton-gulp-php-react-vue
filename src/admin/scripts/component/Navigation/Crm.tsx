import React from 'react';

import routes from '../../Crm/routes.json';
import Navigation from './Navigation';

const links = [
	{
		key: 1,
		label: routes.dashboard.label,
		path: routes.dashboard.path,
		active: false,
	},
	{
		key: 2,
		label: routes.campaigns.label,
		path: routes.campaigns.path,
		active: true,
	},
];

interface NavigationCrmProps {
	sidebarToggle: Function;
}

const NavigationCrm: React.FC<NavigationCrmProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={links} sidebarToggle={sidebarToggle} />;
};

export default NavigationCrm;
