import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

import Language from '../Language';

const Content = styled.div``;

interface ProfileDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const ProfileDialog: React.FC<ProfileDialogProps> = (props) => {
	const { isOpen, onCancel } = props;

	return (
		<Modal
			visible={isOpen}
			onCancel={onCancel}
			wrapClassName="DialogCover"
			width={1000}
			footer={null}
			centered
		>
			<Content>
				Modal 'ProfileDialog' content <br /> <Language.Toggle />{' '}
			</Content>
		</Modal>
	);
};

export default ProfileDialog;
