import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import CFG from '../../../config/global.json';
import { getStyles } from '../styles/theme';
import media from '../styles/responsive';
import { sidebarToggle } from '../store/ui/actions';

import { routeProps, appProps } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Add from '../component/Add';
import Help from '../component/Help';
import Profile from '../component/Profile';
import Spotlight from '../component/Spotlight';
import Confirm from '../component/Confirm';

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
	color: ${getStyles().layout.body_text};
	background-color: ${getStyles().layout.body_bg};
`;

const PreloaderAnimation = keyframes`
  0% { width: 0%; left: 0%; }
  10% { width: 5%; left: 0%; }
  20% { width: 25%; left: 0%; }
  30% { width: 50%; left: 0%; }
  40% { width: 75%; left: 0%; }
  50% { width: 100%; left: 0%; }
  60% { width: 75%; left: 25%; }
  70% { width: 50%; left: 50%; }
  80% { width: 25%; left: 75%; }
  90% { width: 5%; left: 95%; }
  100% { width: 0%; left: 100%; }
`;

const PreloaderLayer = styled.div`
	width: 100%;
	height: 2px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	overflow: hidden;
	background-color: ${getStyles().palette.primary};

	& .preloader-element {
		height: 100%;
		position: relative;
		background-color: blue;
		animation-name: ${PreloaderAnimation};
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
	}
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
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(
		store.$Ui.sideBarOpen,
	);
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

	const logoutHandler = () => {
		// TODO: Handle logout
		console.log('Logout now and redirect back to login');
		setLogoutConfirmOpen(false);
	};

	// Check error data from store
	useEffect(() => {
		if (store.$Ui.dataError) {
			console.log('!! ERROR !!');
			// TODO
			// Display error message
			// Toggle error false
		}
	}, [store.$Ui.dataError]);

	return (
		<>
			<Helmet>
				<title>
					{CFG.CMS.META.name}
					{metaTitle && ` | ${metaTitle}`}
				</title>
			</Helmet>
			{store.$Ui.loadingData && (
				<PreloaderLayer>
					<div className="preloader-element"></div>
				</PreloaderLayer>
			)}
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
				<Add.Dialog isOpen={addDialogOpen} onCancel={toggleAddDialog} />
				<Help.Dialog isOpen={helpDialogOpen} onCancel={toggleHelpDialog} />
				<Profile.Dialog
					isOpen={profileDialogOpen}
					onCancel={toggleProfileDialog}
				/>
				<Spotlight.Dialog isOpen={spotlightOpen} onCancel={toggleSpotlight} />
				<Confirm.Dialog
					isOpen={logoutConfirmOpen}
					onCancel={toggleLogoutConfirm}
					confirmData={{}}
					onConfirm={logoutHandler}
					confirmText={'Yes, Log me out'}
					method={'confirm'}
				/>
			</Wrapper>
		</>
	);
};

export default AppLayout;
