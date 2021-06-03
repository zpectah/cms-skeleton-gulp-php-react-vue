import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import config from '../config';
import media from '../styles/responsive';
import { sidebarToggle } from '../store/ui/actions';
import { routeProps, appProps } from '../types';
import LogoutConfirmDialog from '../component/Profile/LogoutConfirmDialog';
import Preloader from './common/Preloader';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import Footer from './common/Footer';
import Add from '../component/Add';
import Help from '../component/Help';
import Profile from '../component/Profile';
import Spotlight from '../component/Spotlight';

const Wrapper = styled.div`
	width: ${(props) => (props.withSidebar ? 'calc(100vw - 50px)' : '100vw')};
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	left: ${(props) => (props.withSidebar ? '50px' : '0')};

	${media.min.md} {
		width: ${(props) =>
			props.withSidebar
				? props.sidebarOpen
					? 'calc(100vw - 250px)'
					: 'calc(100vw - 50px)'
				: '100vw'};
		left: ${(props) =>
			props.withSidebar ? (props.sidebarOpen ? '250px' : '50px') : '0'};
	}
`;
const MainWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: ${(props) => (props.isCentered ? 'center' : 'flex-start')};
	justify-content: ${(props) => (props.isCentered ? 'center' : 'flex-start')};
	flex-direction: column;
`;
const Main = styled.main`
	width: 100%;
	height: auto;
	padding: 1rem;
	flex: ${(props) => (props.isCentered ? '0' : '1')};
	color: ${(props) => props.theme.body.text};
	background-color: ${(props) => props.theme.body.bg};
`;

interface AppLayoutProps {
	route: routeProps;
	app: appProps['app'];
	metaTitle?: string;
	withSidebar?: boolean;
	widthHeader?: boolean;
	withFooter?: boolean;
	isCentered?: boolean;
	headerTitle?: string;
	headerChildren?: React.ReactElement | React.ReactElement[];
	footerChildren?: React.ReactElement | React.ReactElement[];
	footerWithBorder?: boolean;
	footerCentered?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
	const {
		children,
		app,
		metaTitle = '',
		withSidebar,
		widthHeader,
		withFooter,
		isCentered,
		route,
		headerTitle,
		headerChildren,
		footerChildren,
		footerWithBorder,
		footerCentered,
	} = props;
	const store = useSelector((store: any) => store);
	const dispatch = useDispatch();
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(store.ui.sideBarOpen);
	const [showHelp, setSHowHelp] = useState<string>(store.ui.help);
	const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
	const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
	const [profileDialogOpen, setProfileDialogOpen] = useState<boolean>(false);
	const [spotlightOpen, setSpotlightOpen] = useState<boolean>(false);
	const [logoutConfirmOpen, setLogoutConfirmOpen] = useState<boolean>(false);

	const toggleSidebar = () => {
		let ns = !sidebarOpen;
		setSidebarOpen(ns);
		dispatch(sidebarToggle(ns));
	};
	const toggleLogoutConfirm = () => setLogoutConfirmOpen(!logoutConfirmOpen);
	const toggleAddDialog = () => setAddDialogOpen(!addDialogOpen);
	const toggleHelpDialog = () => setHelpDialogOpen(!helpDialogOpen);
	const toggleProfileDialog = () => setProfileDialogOpen(!profileDialogOpen);
	const toggleSpotlight = () => setSpotlightOpen(!spotlightOpen);

	useEffect(() => {
		setSHowHelp(store.ui.help);
	}, [store.ui.help]);

	return (
		<>
			<Helmet>
				<title>
					{config.GLOBAL.CMS.META.name}
					{metaTitle && ` | ${metaTitle}`}
				</title>
			</Helmet>
			{store.ui.loadingData && <Preloader />}
			<Wrapper withSidebar={withSidebar} sidebarOpen={sidebarOpen}>
				{withSidebar && (
					<Sidebar
						app={app}
						sidebarOpen={sidebarOpen}
						toggleSidebar={toggleSidebar}
						toggleAddDialog={toggleAddDialog}
						toggleHelpDialog={toggleHelpDialog}
						toggleProfileDialog={toggleProfileDialog}
						toggleSpotlight={toggleSpotlight}
						logoutHandler={toggleLogoutConfirm}
					/>
				)}
				<MainWrapper isCentered={isCentered}>
					{widthHeader && (
						<Header
							app={app}
							headerTitle={headerTitle}
							route={route}
							children={headerChildren}
						/>
					)}
					<Main isCentered={isCentered}>{children}</Main>
					{withFooter && (
						<Footer
							route={route}
							children={footerChildren}
							withBorder={footerWithBorder}
							isCentered={footerCentered}
						/>
					)}
				</MainWrapper>
				<Add.Dialog
					isOpen={addDialogOpen}
					onCancel={toggleAddDialog}
					afterClick={toggleAddDialog}
				/>
				{showHelp == 'true' && (
					<Help.Dialog isOpen={helpDialogOpen} onCancel={toggleHelpDialog} />
				)}
				<Profile.Dialog
					isOpen={profileDialogOpen}
					onCancel={toggleProfileDialog}
				/>
				{config.GLOBAL.CMS.UI.SPOTLIGHT && (
					<Spotlight.Dialog isOpen={spotlightOpen} onCancel={toggleSpotlight} />
				)}
				<LogoutConfirmDialog
					isOpen={logoutConfirmOpen}
					toggle={toggleLogoutConfirm}
				/>
			</Wrapper>
		</>
	);
};

export default AppLayout;
