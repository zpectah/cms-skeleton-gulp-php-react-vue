import React from 'react';
import { Modal } from 'antd'; // https://ant.design/components/modal/
import styled from 'styled-components';

import { Button } from '../ui';

const Content = styled.div``;

interface ConfirmDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
	confirmData: any;
	onConfirm: (data) => void;
	confirmText?: string;
	method?: 'delete' | 'confirm';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
	const {
		isOpen,
		onCancel,
		onConfirm,
		confirmData,
		confirmText = 'Confirm',
		method = 'delete',
	} = props;

	return (
		<Modal
			visible={isOpen}
			onCancel={onCancel}
			wrapClassName="DialogCover"
			okText={confirmText}
			zIndex={1005}
			centered
			destroyOnClose
			footer={[
				<Button.Base key="back" onClick={onCancel}>
					Cancel
				</Button.Base>,
				<Button.Base
					key="submit"
					type="primary"
					onClick={() => onConfirm(confirmData)}
					danger={method === 'delete'}
				>
					{method === 'delete' ? 'Delete' : confirmText}
				</Button.Base>,
			]}
		>
			<Content>
				Modal 'ConfirmDialog' content: {JSON.stringify(confirmData)} ...{' '}
			</Content>
		</Modal>
	);
};

export default ConfirmDialog;
