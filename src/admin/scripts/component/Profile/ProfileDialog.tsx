import React from 'react';

import { useUser } from '../../App/hooks';
import Language from '../Language';
import { Modal } from '../../component/ui';

interface ProfileDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = (props) => {
	const { isOpen, onCancel } = props;
	const { User } = useUser();

	return (
		<Modal.Base visible={isOpen} onCancel={onCancel}>
			<Modal.Content>
				Modal 'ProfileDialog' content <br /> <Language.Toggle /> <br />
				{JSON.stringify(User)}
			</Modal.Content>
		</Modal.Base>
	);
};

export default ProfileDialog;
