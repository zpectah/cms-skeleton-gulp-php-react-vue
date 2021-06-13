import React from 'react';
import { useTranslation } from 'react-i18next';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useMessages } from '../../../App/hooks';
import { MessagesItemProps } from '../../../App/types';
import { Modal, Form, Section, Button } from '../../ui';

interface MessagesDetailFormProps {
	detailData: MessagesItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const MessagesDetailForm: React.FC<MessagesDetailFormProps> = ({
	detailData,
	onCancel,
	onDelete,
}) => {
	const { t } = useTranslation(['common']);
	const { toggleMessages, reloadMessages } = useMessages();

	const toggleItem = (detail) => {
		toggleMessages(detail);
		onCancel();

		setTimeout(() => reloadMessages(), SUBMIT_TIMEOUT);
	};

	return (
		<form>
			<Modal.Header>
				<div className="modal-heading-title">{detailData.subject}</div>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<Form.RowNoController label={'From'}>
						{() => <>{detailData.sender}</>}
					</Form.RowNoController>
					<Form.RowNoController label={'To'}>
						{() => <>{detailData.recipients}</>}
					</Form.RowNoController>
					<Form.RowNoController label={'Subject'}>
						{() => <>{detailData.subject}</>}
					</Form.RowNoController>
					<Form.RowNoController label={'Message'}>
						{() => <>{detailData.content}</>}
					</Form.RowNoController>
				</Section.Base>
			</Modal.Content>
			<Modal.Footer>
				<div className="modal-footer-block">
					<Button.Base onClick={() => onCancel()}>{t('btn.close')}</Button.Base>
				</div>
				<div className="modal-footer-block">
					<Button.Base
						type="primary"
						onClick={() => onDelete(detailData)}
						danger
					>
						{t('btn.delete')}
					</Button.Base>
					<div className="modal-footer-column">
						<Button.Base
							type="primary"
							onClick={() => toggleItem(detailData)}
							ghost
						>
							{detailData.status == 2 ? 'Mark unread' : 'Mark read'}
						</Button.Base>
					</div>
				</div>
			</Modal.Footer>
		</form>
	);
};

export default MessagesDetailForm;
