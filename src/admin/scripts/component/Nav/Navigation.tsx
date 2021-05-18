import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isMobileOnly } from 'react-device-detect';
import styled from 'styled-components';

import AppRoutes from '../../App/routes.json';
import MembersRoutes from '../../Members/routes.json';
import CrmRoutes from '../../Crm/routes.json';
import MarketRoutes from '../../Market/routes.json';

const Item = styled.li`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
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
	font-size: 0.9rem;
	font-weight: 500;

	&:hover {
		color: inherit;
		background-color: ${(props) => props.theme.sidebar.navItemHoverBg};
		text-decoration: none;
	}

	&.is-active {
		color: ${(props) => props.theme.sidebar.navItemActiveColor};
		background-color: ${(props) => props.theme.sidebar.navItemActiveBg};
	}
`;
const LinkText = styled.span`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: inherit;
`;

type NavItemProps = {
	key: number;
	label: string;
	path: string;
	active: boolean;
};

interface PrimaryNavigationProps {
	sidebarToggle: Function;
	links: NavItemProps[];
}

const NavigationApp: React.FC<PrimaryNavigationProps> = (props) => {
	const { t } = useTranslation();
	const location = useLocation();
	const { sidebarToggle, links } = props;

	const getActiveClass = (path) => {
		let name;

		if (
			!(
				path == AppRoutes.dashboard.path ||
				path == MembersRoutes.dashboard.path ||
				path == CrmRoutes.dashboard.path ||
				path == MarketRoutes.dashboard.path
			) &&
			location.pathname.includes(path)
		)
			name = 'is-active';

		return name;
	};
	const linkTrigger = () => {
		isMobileOnly && sidebarToggle();
	};

	return (
		<>
			{links.map((item) => {
				if (item.active)
					return (
						<Item key={item.key} title={t(`page:${item.label}`)}>
							<Link
								to={item.path}
								className={[getActiveClass(item.path)].join(' ')}
								activeClassName={'is-active'}
								onClick={linkTrigger}
								exact
							>
								<LinkText>{t(`page:${item.label}`)}</LinkText>
							</Link>
						</Item>
					);
			})}
		</>
	);
};

export default NavigationApp;
