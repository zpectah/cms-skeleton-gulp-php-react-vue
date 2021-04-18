import React from 'react';
import { Modal } from 'antd'; // https://ant.design/components/modal/
import styled from 'styled-components';

const Content = styled.div``;

interface SpotlightDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const SpotlightDialog: React.FC<SpotlightDialogProps> = (props) => {
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
			<Content>Modal 'Spotlight' content</Content>
		</Modal>
	);
};

export default SpotlightDialog;
