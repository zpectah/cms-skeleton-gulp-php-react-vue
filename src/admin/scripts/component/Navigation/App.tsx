import React from 'react';

import routes from '../../App/routes.json';
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
		label: routes.settings.label,
		path: routes.settings.path,
		active: true,
	},
	{
		key: 3,
		label: routes.users.label,
		path: routes.users.path,
		active: true,
	},
	{
		key: 4,
		label: routes.posts.label,
		path: routes.posts.path,
		active: true,
	},
	{
		key: 5,
		label: routes.tags.label,
		path: routes.tags.path,
		active: true,
	},
	{
		key: 6,
		label: routes.categories.label,
		path: routes.categories.path,
		active: true,
	},
	{
		key: 7,
		label: routes.translations.label,
		path: routes.translations.path,
		active: true,
	},
	{
		key: 8,
		label: routes.pages.label,
		path: routes.pages.path,
		active: true,
	},
	{
		key: 9,
		label: routes.uploads.label,
		path: routes.uploads.path,
		active: true,
	},
	{
		key: 10,
		label: routes.menu.label,
		path: routes.menu.path,
		active: true,
	},
	{
		key: 11,
		label: routes.messages.label,
		path: routes.messages.path,
		active: true,
	},
];

interface NavigationAppProps {
	sidebarToggle: Function;
}

const NavigationApp: React.FC<NavigationAppProps> = (props) => {
	const { sidebarToggle } = props;

	return <Navigation links={links} sidebarToggle={sidebarToggle} />;
};

export default NavigationApp;
