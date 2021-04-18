import React from 'react';

import { Button, Modal } from '../ui';

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
		<Modal.Base visible={isOpen} onCancel={onCancel}>
			<Modal.Content>
				Modal 'ConfirmDialog' content: {JSON.stringify(confirmData)} ...{' '}
			</Modal.Content>
			<Modal.Footer>
				<Button.Base onClick={onCancel}>Cancel</Button.Base>
				<Button.Base
					type="primary"
					onClick={() => onConfirm(confirmData)}
					danger={method === 'delete'}
				>
					{method === 'delete' ? 'Delete' : confirmText}
				</Button.Base>
			</Modal.Footer>
		</Modal.Base>
	);
};

export default ConfirmDialog;
