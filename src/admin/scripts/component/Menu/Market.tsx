import React from 'react';

import Navigation from './Navigation';
import navItems from '../../config.navItems';

interface NavigationMarketProps {
	sidebarToggle: Function;
}

const NavigationMarket: React.FC<NavigationMarketProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={navItems.market} sidebarToggle={sidebarToggle} />;
};

export default NavigationMarket;
