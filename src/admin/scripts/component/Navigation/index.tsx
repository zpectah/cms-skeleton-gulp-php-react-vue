import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getStyles } from '../../utils/styles.theme';
import routes from '../../App/routes.json';

const links = [
	{
		label: routes.dashboard.label,
		path: routes.dashboard.path,
		active: true,
	},
	{
		label: routes.settings.label,
		path: routes.settings.path,
		active: true,
	},
	{
		label: routes.users.label,
		path: routes.users.path,
		active: true,
	},
	{
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

	&.active {
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
	const {} = props;

	return (
		<List>
			{links.map((item) => {
				if (item.active)
					return (
						<Item key={item.label}>
							<Link to={item.path} activeClassName={'active'} exact>
								<LinkText>{t(`page:${item.label}`)}</LinkText>
							</Link>
						</Item>
					);
			})}
		</List>
	);
};

export default Navigation;
