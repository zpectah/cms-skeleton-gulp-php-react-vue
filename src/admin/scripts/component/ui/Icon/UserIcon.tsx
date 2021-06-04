import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { USER_LEVEL } from '../../../constants';

const Wrapper = styled.span`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	& small {
		padding-left: 0.5rem;
	}
`;

import MaterialDesignIcon from '../Icon/MaterialDesignIcon';

interface UserIconProps {
	level: number;
	size?: number;
	withLabel?: boolean;
}

const UserIcon = ({ level, size = 40, withLabel = false }: UserIconProps) => {
	const [type, setType] = useState(null);
	const [label, setLabel] = useState(null);
	const { t } = useTranslation('types');

	useMemo(() => {
		switch (level) {
			case USER_LEVEL.demo.id:
				setType('Face');
				setLabel(t(`types:${USER_LEVEL.demo.key}`));
				break;
			case USER_LEVEL.redactor.id:
				setType('PermIdentity');
				setLabel(t(`types:${USER_LEVEL.redactor.key}`));
				break;
			case USER_LEVEL.chief_redactor.id:
				setType('SupervisorAccount');
				setLabel(t(`types:${USER_LEVEL.chief_redactor.key}`));
				break;
			case USER_LEVEL.admin.id:
				setType('SupervisedUserCircle');
				setLabel(t(`types:${USER_LEVEL.admin.key}`));
				break;
			case USER_LEVEL.super_admin.id:
				setType('VerifiedUser');
				setLabel(t(`types:${USER_LEVEL.super_admin.key}`));
				break;
		}
	}, []);

	return (
		<Wrapper>
			<MaterialDesignIcon type={type} size={size} />
			{withLabel && <small>{label}</small>}
		</Wrapper>
	);
};

export default UserIcon;
