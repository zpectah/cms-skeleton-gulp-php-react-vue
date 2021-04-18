import React from 'react';
import styled from 'styled-components';

import { Modal } from '../../component/ui';

const Content = styled.div``;

interface SpotlightDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const SpotlightDialog: React.FC<SpotlightDialogProps> = (props) => {
	const { isOpen, onCancel } = props;

	return (
		<Modal.Base visible={isOpen} onCancel={onCancel}>
			<Modal.Content>Modal 'Spotlight' content</Modal.Content>
		</Modal.Base>
	);
};

export default SpotlightDialog;
