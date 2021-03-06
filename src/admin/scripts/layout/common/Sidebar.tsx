import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Media from 'react-media';
import { useSelector } from 'react-redux';

import config from '../../config';
import { PIXEL_COEFFICIENT, BREAKPOINTS } from '../../constants';
import media from '../../styles/responsive';
import { Scrollable, Icon } from '../../component/ui';
import Menu from '../../component/Menu';
import { appProps } from '../../types';
import { useSettings } from '../../App/hooks';
import Profile from '../../component/Profile';

const Wrapper = styled.aside`
	width: 50px;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;

	${media.min.md} {
		width: ${(props) => (props.open ? '250px' : '50px')};
	}
`;
const BarWrapper = styled.div`
	width: 50px;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	color: ${(props) => props.theme.sidebar.barText};
	background-color: ${(props) => props.theme.sidebar.barBg};
	border-right: 1px solid ${(props) => props.theme.sidebar.barBorder};
`;
const PanelWrapper = styled.div`
	width: calc(100vw - 50px);
	height: 100vh;
	position: absolute;
	top: 0;
	left: ${(props) => (props.open ? '50px' : 'calc((100vw - 50px) * -1 )')};
	z-index: 99;
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.sidebar.panelText};
	background-color: ${(props) => props.theme.sidebar.panelBg};
	border-right: 1px solid ${(props) => props.theme.sidebar.panelBorder};
	backdrop-filter: blur(4px);

	& > div {
		width: 100%;
		height: auto;
		position: relative;
	}

	& > .primary {
		height: 50px;
		flex: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	& > .secondary {
		flex: 1;
	}

	& .content {
		padding: 1rem;
	}

	${media.min.md} {
		width: 200px;
		left: ${(props) => (props.open ? '50px' : '-200px')};
	}
`;
const MetaName = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	text-align: center;
	font-size: 0.85rem;
	font-weight: 700;
`;
const Trigger = styled.button`
	width: 50px;
	height: 50px;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	border: 0;
	outline: none;
	font-size: 1.5rem;
	cursor: pointer;
	color: inherit;

	&:hover {
		color: ${(props) => props.theme.sidebar.triggerHover};
	}

	& svg {
		max-width: 40px;
	}
`;
const NavList = styled.ul`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
	list-style: none;

	& > li {
		border-bottom: 1px solid ${(props) => props.theme.sidebar.navItemBorder};

		&:last-child {
			border-bottom: 0;
		}
	}
`;

interface SidebarProps {
	app: appProps['app'];
	sidebarOpen: boolean;
	toggleSidebar: () => void;
	toggleAddDialog: () => void;
	toggleHelpDialog: () => void;
	toggleProfileDialog: () => void;
	toggleSpotlight: () => void;
	logoutHandler: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
	sidebarOpen,
	toggleSidebar,
	toggleAddDialog,
	toggleHelpDialog,
	toggleProfileDialog,
	toggleSpotlight,
	logoutHandler,
}) => {
	const { Settings } = useSettings();
	const store = useSelector((store: any) => store);
	const [showHelp, setSHowHelp] = useState<string>(store.ui.help);
	const projectName = Settings ? Settings['project_name'] : '...';
	const modules = {
		Members: Settings ? Settings['module_members_active'] : false,
		Market: Settings ? Settings['module_market_active'] : false,
	};
	const iconSize = 25;

	useEffect(() => {
		setSHowHelp(store.ui.help);
	}, [store.ui.help]);

	return (
		<>
			<Wrapper open={sidebarOpen}>
				<BarWrapper>
					<div>
						<Trigger onClick={toggleSidebar}>
							{sidebarOpen ? (
								<Media
									queries={{
										md: { maxWidth: BREAKPOINTS.md - PIXEL_COEFFICIENT },
									}}
								>
									{(matches) =>
										matches.md ? (
											<Icon.Material type="Close" size={iconSize} />
										) : (
											<Icon.Material type="MenuOpen" size={iconSize} />
										)
									}
								</Media>
							) : (
								<Icon.Material type="Menu" size={iconSize} />
							)}
						</Trigger>
						{config.GLOBAL.CMS.UI.SPOTLIGHT && (
							<Trigger onClick={toggleSpotlight}>
								<Icon.Material type="Search" size={iconSize} />
							</Trigger>
						)}
						<Trigger onClick={toggleAddDialog}>
							<Icon.Material type="Add" size={iconSize} />
						</Trigger>
					</div>
					<div>&nbsp;</div>
					<div>
						{showHelp == 'true' && (
							<Trigger onClick={toggleHelpDialog}>
								<Icon.Material type="HelpOutline" size={iconSize} />
							</Trigger>
						)}
						<Trigger onClick={toggleProfileDialog}>
							<Profile.Avatar size={iconSize} />
						</Trigger>
						<Trigger onClick={logoutHandler}>
							<Icon.Material type="PowerSettings" size={iconSize} />
						</Trigger>
					</div>
				</BarWrapper>
				<PanelWrapper open={sidebarOpen}>
					<div className="primary">
						<MetaName>{config.GLOBAL.CMS.META.name}</MetaName>
						<MetaName>{projectName}</MetaName>
					</div>
					<div className="secondary">
						<Scrollable.Base>
							<div className="content">
								<NavList>
									<Menu.App sidebarToggle={toggleSidebar} />
									{modules.Members && (
										<Menu.Members sidebarToggle={toggleSidebar} />
									)}
									{modules.Market && (
										<Menu.Market sidebarToggle={toggleSidebar} />
									)}
								</NavList>
							</div>
						</Scrollable.Base>
					</div>
				</PanelWrapper>
			</Wrapper>
		</>
	);
};

export default Sidebar;
