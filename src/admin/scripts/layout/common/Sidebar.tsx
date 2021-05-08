import React from 'react';
import styled from 'styled-components';
import {
	MdMenu,
	MdKeyboardArrowLeft,
	MdPowerSettingsNew,
	MdClose,
	MdSearch,
	MdAdd,
	MdHelpOutline,
	MdAccountCircle,
} from 'react-icons/md';
import Media from 'react-media';

import { PIXEL_COEFFICIENT, BREAKPOINTS } from '../../constants';
import CFG from '../../../../config/global.json';
import { getStyles } from '../../styles/theme';
import media from '../../styles/responsive';
import { Scrollable } from '../../component/ui';
import Navigation from '../../component/Navigation';
import { appProps } from '../../types';
import { useSettings } from '../../App/hooks';

const Wrapper = styled.aside`
	width: 50px;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	color: ${getStyles().layout.sidebar_text};
	background-color: transparent;

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
	color: ${getStyles().layout.sidebar_text};
	background-color: ${getStyles().layout.sidebar_bg};
	border-right: 1px solid ${getStyles().layout.sidebar_border_color};
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
	color: ${getStyles().layout.sidebar_panel_text};
	background-color: ${getStyles().layout.sidebar_panel_bg};
	border-right: 1px solid ${getStyles().layout.sidebar_border_color};
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
		color: ${getStyles().layout.link};
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

const Sidebar: React.FC<SidebarProps> = (props) => {
	const {
		sidebarOpen,
		toggleSidebar,
		toggleAddDialog,
		toggleHelpDialog,
		toggleProfileDialog,
		toggleSpotlight,
		logoutHandler,
	} = props;
	const { Settings } = useSettings();
	const projectName = Settings ? Settings['project_name'] : '...';

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
										matches.md ? <MdClose /> : <MdKeyboardArrowLeft />
									}
								</Media>
							) : (
								<MdMenu />
							)}
						</Trigger>
						<Trigger onClick={toggleSpotlight}>
							<MdSearch />
						</Trigger>
						<Trigger onClick={toggleAddDialog}>
							<MdAdd />
						</Trigger>
					</div>
					<div>&nbsp;</div>
					<div>
						<Trigger onClick={toggleHelpDialog}>
							<MdHelpOutline />
						</Trigger>
						<Trigger onClick={toggleProfileDialog}>
							<MdAccountCircle />
						</Trigger>
						<Trigger onClick={logoutHandler}>
							<MdPowerSettingsNew />
						</Trigger>
					</div>
				</BarWrapper>
				<PanelWrapper open={sidebarOpen}>
					<div className="primary">
						<MetaName>{CFG.CMS.META.name}</MetaName>
						<MetaName>{projectName}</MetaName>
					</div>
					<div className="secondary">
						<Scrollable.Base>
							<div className="content">
								<Navigation.Primary sidebarToggle={toggleSidebar} />
							</div>
						</Scrollable.Base>
					</div>
				</PanelWrapper>
			</Wrapper>
		</>
	);
};

export default Sidebar;
