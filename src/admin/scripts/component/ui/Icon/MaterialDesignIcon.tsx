import React from 'react';

import {
	Place,
	Face,
	PermIdentity,
	SupervisorAccount,
	SupervisedUserCircle,
	VerifiedUser,
	Visibility,
	VisibilityOff,
	Check,
	Close,
	Add,
	Remove,
	PushPin,
	Create,
	CloudUpload,
	CloudDownload,
	Download,
	CloudQueue,
	Upload,
	Description,
	Save,
	Image,
	Mic,
	Movie,
	Menu,
	MenuOpen,
	PowerSettings,
	LogOut,
	LogIn,
	ManageAccounts,
	Search,
	Settings,
	Home,
	Cancel,
	HelpOutline,
} from '../../../../../libs/svg/material-icons';
import Icon from './Icon';

interface MaterialDesignIconProps {
	type:
		| 'Place'
		| 'Face'
		| 'PermIdentity'
		| 'SupervisorAccount'
		| 'SupervisedUserCircle'
		| 'VerifiedUser'
		| 'Visibility'
		| 'VisibilityOff'
		| 'Check'
		| 'Close'
		| 'Add'
		| 'Remove'
		| 'PushPin'
		| 'Create'
		| 'CloudUpload'
		| 'CloudDownload'
		| 'Download'
		| 'CloudQueue'
		| 'Upload'
		| 'Description'
		| 'Save'
		| 'Image'
		| 'Mic'
		| 'Movie'
		| 'Menu'
		| 'MenuOpen'
		| 'PowerSettings'
		| 'LogOut'
		| 'LogIn'
		| 'ManageAccounts'
		| 'Search'
		| 'Settings'
		| 'Home'
		| 'Cancel'
		| 'HelpOutline';
	size?: number;
}

const MaterialDesignIcon = ({ type, size = 50 }: MaterialDesignIconProps) => {
	const iconKey = {
		Place: Place,
		Face: Face,
		PermIdentity: PermIdentity,
		SupervisorAccount: SupervisorAccount,
		SupervisedUserCircle: SupervisedUserCircle,
		VerifiedUser: VerifiedUser,
		Visibility: Visibility,
		VisibilityOff: VisibilityOff,
		Check: Check,
		Close: Close,
		Add: Add,
		Remove: Remove,
		PushPin: PushPin,
		Create: Create,
		CloudUpload: CloudUpload,
		CloudDownload: CloudDownload,
		Download: Download,
		CloudQueue: CloudQueue,
		Upload: Upload,
		Description: Description,
		Save: Save,
		Image: Image,
		Mic: Mic,
		Movie: Movie,
		Menu: Menu,
		MenuOpen: MenuOpen,
		PowerSettings: PowerSettings,
		LogOut: LogOut,
		LogIn: LogIn,
		ManageAccounts: ManageAccounts,
		Search: Search,
		Settings: Settings,
		Home: Home,
		Cancel: Cancel,
		HelpOutline: HelpOutline,
	};

	return <Icon source={iconKey[type]} size={size} />;
};

export default MaterialDesignIcon;
