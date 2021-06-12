import React from 'react';

import { NAV_ITEMS } from '../../constants';
import Navigation from './Navigation';

interface NavigationMarketProps {
	sidebarToggle: Function;
}

const NavigationMarket: React.FC<NavigationMarketProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={NAV_ITEMS.market} sidebarToggle={sidebarToggle} />;
};

export default NavigationMarket;
