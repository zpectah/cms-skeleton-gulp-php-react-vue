import React from 'react';
import { Modal } from 'antd'; // https://ant.design/components/modal/
import styled from 'styled-components';

const Content = styled.div``;

interface AddDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const AddDialog: React.FC<AddDialogProps> = (props) => {
	const { isOpen, onCancel } = props;

	return (
		<Modal
			visible={isOpen}
			onCancel={onCancel}
			wrapClassName="DialogCover"
			footer={null}
			centered
		>
			<Content>Modal 'AddDialog' content</Content>
		</Modal>
	);
};

export default AddDialog;
