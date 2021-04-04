import React from 'react';
import { Modal } from 'antd'; // https://ant.design/components/modal/
import styled from 'styled-components';

const Content = styled.div``;

interface HelpDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = (props) => {
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
			<Content>Modal 'HelpDialog' content</Content>
		</Modal>
	);
};

export default HelpDialog;
