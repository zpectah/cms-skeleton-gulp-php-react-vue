import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from '../ui';

interface DetailFooterProps {
	onCancel: Function;
	onDelete: Function;
	isNew: boolean;
	invalid: boolean;
	detailData: any;
	allowSave: boolean;
	allowDelete: boolean;
}

const DetailFooter: React.FC<DetailFooterProps> = ({
	onCancel,
	onDelete,
	isNew,
	invalid,
	detailData,
	allowSave,
	allowDelete,
}) => {
	const { t } = useTranslation(['common']);

	return (
		<Modal.Footer>
			<div className="modal-footer-block">
				{allowSave && (
					<Button.Base type="primary" htmlType="submit" disabled={invalid}>
						{isNew ? t('btn.create') : t('btn.save')}
					</Button.Base>
				)}
				{allowDelete && allowSave && (
					<div className="modal-footer-column">
						{!isNew && (
							<Button.Base
								type="primary"
								onClick={() => onDelete(detailData)}
								danger
							>
								{t('btn.delete')}
							</Button.Base>
						)}
					</div>
				)}
			</div>
			<div className="modal-footer-block">
				<Button.Base onClick={() => onCancel()}>{t('btn.close')}</Button.Base>
			</div>
		</Modal.Footer>
	);
};

export default DetailFooter;
