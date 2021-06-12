import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tag } from 'antd';

// import { useRequests } from '../../../App/hooks';
import { RequestsItemProps } from '../../../App/types';
import { Modal, Form, Section, Button } from '../../ui';

interface RequestsDetailFormProps {
	detailData: RequestsItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const RequestsDetailForm: React.FC<RequestsDetailFormProps> = ({
	detailData,
	onCancel,
	onDelete,
}) => {
	const { t } = useTranslation(['common']);
	// const { reloadRequests } = useRequests();

	return (
		<form>
			<Modal.Header>
				<div className="modal-heading-title">{t('model_item.Requests')}</div>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<Form.RowNoController label={'Type'}>
						{() => <Tag>{detailData.type}</Tag>}
					</Form.RowNoController>
					<Form.RowNoController label={'Context'}>
						{() => <>{detailData.context}</>}
					</Form.RowNoController>
					<Form.RowNoController label={'Value'}>
						{() => <>{detailData.value}</>}
					</Form.RowNoController>
					<Form.RowNoController label={'Token'}>
						{() => <>{detailData.token}</>}
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
				</div>
			</Modal.Footer>
		</form>
	);
};

export default RequestsDetailForm;
