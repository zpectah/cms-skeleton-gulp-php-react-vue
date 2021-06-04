import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseButton from './BaseButton';

interface ToggleButtonProps {
	onClick?: () => void;
	title?: string;
	style?: any;
	isToggled: boolean;
	isHidden?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
	onClick,
	title,
	style,
	isToggled = false,
	isHidden,
}) => {
	const { t } = useTranslation(['common', 'component']);

	return (
		<>
			{!isHidden && (
				<BaseButton type="link" style={style} title={title} onClick={onClick}>
					{isToggled ? <>{t('btn.disable')}</> : <>{t('btn.active')}</>}
				</BaseButton>
			)}
		</>
	);
};
export default ToggleButton;
