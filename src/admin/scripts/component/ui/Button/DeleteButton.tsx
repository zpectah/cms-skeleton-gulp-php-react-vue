import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseButton from './BaseButton';

interface DeleteButtonProps {
	onClick?: () => void;
	title?: string;
	style?: any;
	isHidden?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
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
				<BaseButton
					type="link"
					style={style}
					title={title}
					onClick={onClick}
					danger
				>
					{children ? children : t('btn.delete')}
				</BaseButton>
			)}
		</>
	);
};

export default DeleteButton;
