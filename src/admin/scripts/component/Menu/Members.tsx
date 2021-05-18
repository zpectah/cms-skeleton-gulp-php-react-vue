import React from 'react';

import Navigation from './Navigation';
import navItems from '../../config.navItems';

interface NavigationMembersProps {
	sidebarToggle: Function;
}

const NavigationMembers: React.FC<NavigationMembersProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={navItems.members} sidebarToggle={sidebarToggle} />;
};

export default NavigationMembers;
