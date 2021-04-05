import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import CFG from '../../../config/global.json';
import { getStyles } from '../utils/styles.theme';
import { minWidth } from '../utils/styles.responsive';
import { sidebarToggle } from '../store/ui/actions';

import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import AddDialog from '../component/AddDialog';
import HelpDialog from '../component/HelpDialog';
import ProfileDialog from '../component/ProfileDialog';
import Spotlight from '../component/Spotlight';
import ConfirmDialog from '../component/ConfirmDialog';

const Wrapper = styled.div`
	width: ${(props) => (props.withSidebar ? 'calc(100vw - 50px)' : '100vw')};
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	left: ${(props) => (props.withSidebar ? '50px' : '0')};

	${minWidth.md} {
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

interface AppLayoutProps {
	route: {
		path: string | null;
		pathDetail: string | null;
		name: string;
		label: string | null;
		auth: number;
	};
	app: 'App' | 'Crm' | 'Market';
	metaTitle?: string;
	withSidebar?: boolean;
	widthHeader?: boolean;
	withFooter?: boolean;
	isCentered?: boolean;
	headerTitle?: string;
	headerChildren?: React.ReactElement | React.ReactElement[];
	footerChildren?: React.ReactElement | React.ReactElement[];
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
	const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

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

	return (
		<>
			<Helmet>
				<title>
					{CFG.CMS.META.name}
					{metaTitle && ` | ${metaTitle}`}
				</title>
			</Helmet>
			<Wrapper withSidebar={withSidebar} sidebarOpen={sidebarOpen}>
				{withSidebar && (
					<Sidebar
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
					{withFooter && <Footer route={route} children={footerChildren} />}
				</MainWrapper>
				<AddDialog isOpen={addDialogOpen} onCancel={toggleAddDialog} />
				<HelpDialog isOpen={helpDialogOpen} onCancel={toggleHelpDialog} />
				<ProfileDialog
					isOpen={profileDialogOpen}
					onCancel={toggleProfileDialog}
				/>
				<Spotlight isOpen={spotlightOpen} onCancel={toggleSpotlight} />
				<ConfirmDialog
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
