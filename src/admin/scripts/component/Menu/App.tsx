import React from 'react';

import { NAV_ITEMS } from '../../constants';
import Navigation from './Navigation';

interface NavigationAppProps {
	sidebarToggle: Function;
}

const NavigationApp: React.FC<NavigationAppProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={NAV_ITEMS.app} sidebarToggle={sidebarToggle} />;
};

export default NavigationApp;
