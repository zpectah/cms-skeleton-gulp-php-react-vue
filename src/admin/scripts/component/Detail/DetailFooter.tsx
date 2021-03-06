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
	onSubmit: () => void;
}

const DetailFooter: React.FC<DetailFooterProps> = ({
	onCancel,
	onDelete,
	isNew,
	invalid,
	detailData,
	allowSave,
	allowDelete,
	onSubmit,
}) => {
	const { t } = useTranslation(['common']);

	return (
		<Modal.Footer>
			<div className="modal-footer-block">
				<Button.Base onClick={() => onCancel()}>{t('btn.close')}</Button.Base>
			</div>
			<div className="modal-footer-block">
				{allowDelete && allowSave && (
					<>
						{!isNew && (
							<Button.Base
								type="primary"
								onClick={() => onDelete(detailData)}
								danger
							>
								{t('btn.delete')}
							</Button.Base>
						)}
					</>
				)}
				{allowSave && (
					<div className="modal-footer-column">
						<Button.Base type="primary" disabled={invalid} onClick={onSubmit}>
							{isNew ? t('btn.create') : t('btn.saveChanges')}
						</Button.Base>
					</div>
				)}
			</div>
		</Modal.Footer>
	);
};

export default DetailFooter;
