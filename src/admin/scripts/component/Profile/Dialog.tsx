import React from 'react';

import { useProfile } from '../../App/hooks';
import { Modal } from '../../component/ui';
import LocaleToggle from './LocaleToggle';

interface ProfileDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const Dialog: React.FC<ProfileDialogProps> = (props) => {
	const { isOpen, onCancel } = props;
	const { Profile } = useProfile();

	return (
		<Modal.Base visible={isOpen} onCancel={onCancel}>
			<Modal.Content>
				Modal 'ProfileDialog' content <br /> <LocaleToggle /> <br />
				{JSON.stringify(Profile)}
			</Modal.Content>
		</Modal.Base>
	);
};

export default Dialog;
