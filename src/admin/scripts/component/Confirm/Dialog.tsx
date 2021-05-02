import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from '../ui';

const ConfirmWrapper = styled.div`
	width: 100%;
	height: auto;
	padding: 2.5rem 0 1.5rem 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	text-align: center;
`;
const ActionWrapper = styled.div`
	width: 80%;
	height: auto;
	margin-left: 10%;
	padding: 1rem 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

interface ConfirmDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
	confirmData: any;
	confirmContent?: any;
	onConfirm: (data) => void;
	confirmText?: string;
	method?: 'delete' | 'confirm' | 'logout';
}

const Dialog: React.FC<ConfirmDialogProps> = (props) => {
	const { t } = useTranslation(['component']);
	const {
		isOpen,
		onCancel,
		onConfirm,
		confirmData,
		confirmContent,
		confirmText,
		method = 'delete',
	} = props;

	const getContent = () => {
		let content;

		if (confirmContent) {
			content = confirmContent;
		} else {
			switch (method) {
				case 'logout':
					content = t('component:Confirm.message.logout');
					break;

				case 'confirm':
					content = t('component:Confirm.message.confirm');
					break;

				case 'delete':
				default:
					content = confirmData.id
						? t('component:Confirm.message.delete')
						: t('component:Confirm.message.delete', {
								count: confirmData.length,
						  });
					break;
			}
		}

		return content;
	};
	const getConfirmLabel = () => {
		let label;

		if (confirmText) {
			label = confirmText;
		} else {
			switch (method) {
				case 'logout':
					label = t('component:Confirm.btnLogout');
					break;

				case 'confirm':
					label = t('component:Confirm.btnAgree');
					break;

				case 'delete':
				default:
					label = t('component:Confirm.btnDelete');
					break;
			}
		}

		return label;
	};

	return (
		<Modal.Base visible={isOpen} onCancel={onCancel} size={'sm'}>
			<Modal.Content>
				<ConfirmWrapper>{confirmData && getContent()}</ConfirmWrapper>
				<ActionWrapper>
					<Button.Base onClick={onCancel}>
						{t('component:Confirm.btnCancel')}
					</Button.Base>
					<Button.Base
						type="primary"
						onClick={() => onConfirm(confirmData)}
						danger={method === 'delete'}
					>
						{getConfirmLabel()}
					</Button.Base>
				</ActionWrapper>
			</Modal.Content>
		</Modal.Base>
	);
};

export default Dialog;
