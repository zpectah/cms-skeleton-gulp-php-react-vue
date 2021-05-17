import React from 'react';

import routes from '../../Members/routes.json';
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
		label: routes.members.label,
		path: routes.members.path,
		active: true,
	},
];

interface NavigationMembersProps {
	sidebarToggle: Function;
}

const NavigationMembers: React.FC<NavigationMembersProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={links} sidebarToggle={sidebarToggle} />;
};

export default NavigationMembers;
