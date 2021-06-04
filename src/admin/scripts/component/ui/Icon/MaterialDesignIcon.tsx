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
		| 'Movie';
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
	};

	return <Icon source={iconKey[type]} size={size} />;
};

export default MaterialDesignIcon;
