import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getStyles } from '../../utils/styles.theme';
import routes from '../../App/routes.json';

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
];

const List = styled.ul`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
	list-style: none;
`;
const Item = styled.li`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
	border-bottom: 1px solid rgb(225, 225, 225);

	&:last-child {
		border-bottom: 0;
	}
`;
const Link = styled(NavLink)`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0.4rem 1rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	color: inherit;
	font-size: 0.95rem;
	font-weight: bold;

	&:hover {
		color: inherit;
		background-color: rgb(235, 235, 235);
		text-decoration: none;
	}

	&.is-active {
		color: ${getStyles().layout.active_text};
		background-color: ${getStyles().layout.active_bg};
	}
`;
const LinkText = styled.span`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: inherit;
`;

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = (props) => {
	const { t } = useTranslation();
	const location = useLocation();
	const {} = props;

	const isLinkActive = (path) => {
		if (path !== routes.dashboard.path) return location.pathname.includes(path);
	};

	return (
		<List>
			{links.map((item) => {
				if (item.active)
					return (
						<Item key={item.key}>
							<Link
								to={item.path}
								className={[isLinkActive(item.path) ? 'is-active' : ''].join(
									' ',
								)}
								activeClassName={'is-active'}
								exact
							>
								<LinkText>{t(`page:${item.label}`)}</LinkText>
							</Link>
						</Item>
					);
			})}
		</List>
	);
};

export default Navigation;
