import React from 'react';

import Navigation from './Navigation';
import navItems from '../../config.navItems';

interface NavigationCrmProps {
	sidebarToggle: Function;
}

const NavigationCrm: React.FC<NavigationCrmProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={navItems.crm} sidebarToggle={sidebarToggle} />;
};

export default NavigationCrm;
