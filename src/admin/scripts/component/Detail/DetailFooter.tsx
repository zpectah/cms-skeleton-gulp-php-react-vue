import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Modal } from '../ui';

interface DetailFooterProps {
	onCancel: Function;
	onDelete: Function;
	isNew: boolean;
	invalid: boolean;
	detailData: any;
}

const DetailFooter: React.FC<DetailFooterProps> = ({
	onCancel,
	onDelete,
	isNew,
	invalid,
	detailData,
}) => {
	const { t } = useTranslation(['common']);

	return (
		<Modal.Footer>
			<Button.Base onClick={() => onCancel()}>{t('btn.close')}</Button.Base>
			{!isNew && (
				<>
					<Button.Base
						type="primary"
						onClick={() => onDelete(detailData)}
						danger
					>
						{t('btn.delete')}
					</Button.Base>
				</>
			)}
			<Button.Base type="primary" htmlType="submit" disabled={invalid}>
				{isNew ? t('btn.create') : t('btn.save')}
			</Button.Base>
		</Modal.Footer>
	);
};

export default DetailFooter;
