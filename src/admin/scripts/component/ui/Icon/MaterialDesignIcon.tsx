import React from 'react';

import {
	IconMaterial_Place,
	IconMaterial_Face,
	IconMaterial_PermIdentity,
	IconMaterial_SupervisorAccount,
	IconMaterial_SupervisedUserCircle,
	IconMaterial_VerifiedUser,
	IconMaterial_Visibility,
	IconMaterial_VisibilityOff,
	IconMaterial_Check,
	IconMaterial_Close,
	IconMaterial_Add,
	IconMaterial_Remove,
	IconMaterial_PushPin,
	IconMaterial_Create,
	IconMaterial_CloudUpload,
	IconMaterial_CloudDownload,
	IconMaterial_Download,
	IconMaterial_CloudQueue,
	IconMaterial_Upload,
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
		| 'Upload';
	size?: number;
}

const MaterialDesignIcon = ({ type, size = 50 }: MaterialDesignIconProps) => {
	const iconKey = {
		Place: IconMaterial_Place,
		Face: IconMaterial_Face,
		PermIdentity: IconMaterial_PermIdentity,
		SupervisorAccount: IconMaterial_SupervisorAccount,
		SupervisedUserCircle: IconMaterial_SupervisedUserCircle,
		VerifiedUser: IconMaterial_VerifiedUser,
		Visibility: IconMaterial_Visibility,
		VisibilityOff: IconMaterial_VisibilityOff,
		Check: IconMaterial_Check,
		Close: IconMaterial_Close,
		Add: IconMaterial_Add,
		Remove: IconMaterial_Remove,
		PushPin: IconMaterial_PushPin,
		Create: IconMaterial_Create,
		CloudUpload: IconMaterial_CloudUpload,
		CloudDownload: IconMaterial_CloudDownload,
		Download: IconMaterial_Download,
		CloudQueue: IconMaterial_CloudQueue,
		Upload: IconMaterial_Upload,
	};

	return <Icon source={iconKey[type]} size={size} />;
};

export default MaterialDesignIcon;
