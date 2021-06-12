import React from 'react';

import { NAV_ITEMS } from '../../constants';
import Navigation from './Navigation';

interface NavigationMembersProps {
	sidebarToggle: Function;
}

const NavigationMembers: React.FC<NavigationMembersProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={NAV_ITEMS.members} sidebarToggle={sidebarToggle} />;
};

export default NavigationMembers;
