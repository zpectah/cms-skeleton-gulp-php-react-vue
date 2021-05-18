import React from 'react';

import Navigation from './Navigation';
import navItems from '../../config.navItems';

interface NavigationAppProps {
	sidebarToggle: Function;
}

const NavigationApp: React.FC<NavigationAppProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={navItems.app} sidebarToggle={sidebarToggle} />;
};

export default NavigationApp;
