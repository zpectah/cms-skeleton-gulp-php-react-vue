import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseButton from './BaseButton';

interface EditButtonProps {
	onClick?: () => void;
	title?: string;
	style?: any;
	isHidden?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({
	children,
	onClick,
	title,
	style,
	isHidden,
}) => {
	const { t } = useTranslation(['common']);

	return (
		<>
			{!isHidden && (
				<BaseButton type="link" style={style} title={title} onClick={onClick}>
					{children ? children : t('btn.detail')}
				</BaseButton>
			)}
		</>
	);
};

export default EditButton;
