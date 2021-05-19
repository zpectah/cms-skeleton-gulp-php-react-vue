import React from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { MESSAGE_SUCCESS_DURATION } from '../../constants';
import Confirm from '../../component/Confirm';
import { useProfile } from '../../App/hooks';

interface LogoutConfirmDialogProps {
	isOpen: boolean;
	toggle: Function;
}

const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
	isOpen,
	toggle,
}) => {
	const history = useHistory();
	const { userLogout } = useProfile();
	const { t } = useTranslation(['message']);

	const logoutHandler = () => {
		return userLogout({}).then((res) => {
			if (res.data[0] && res.data[1]) {
				history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
				message.success(t('message:userLogout'), MESSAGE_SUCCESS_DURATION);
			}
		});
	};

	return (
		<Confirm.Dialog
			isOpen={isOpen}
			onCancel={() => toggle()}
			confirmData={{}}
			onConfirm={logoutHandler}
			method={'logout'}
		/>
	);
};

export default LogoutConfirmDialog;
