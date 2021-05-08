import React from 'react';
import { useHistory } from 'react-router-dom';

import CFG from '../../../../config/global.json';
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
	const { Profile, userLogout } = useProfile();

	const logoutHandler = () => {
		return userLogout({ email: Profile.email }).then((res) => {
			console.log('Logout now and redirect back to login');
			console.log(res);
			history.push(CFG.CMS.UNAUTHORIZED_REDIRECT_TARGET);
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
