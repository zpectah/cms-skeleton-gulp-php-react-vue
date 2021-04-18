import React from 'react';
import styled from 'styled-components';

import { Modal } from '../../component/ui';

const Content = styled.div``;

interface HelpDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = (props) => {
	const { isOpen, onCancel } = props;

	return (
		<Modal.Base visible={isOpen} onCancel={onCancel}>
			<Modal.Content>Modal 'HelpDialog' content</Modal.Content>
		</Modal.Base>
	);
};

export default HelpDialog;
