import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { USER_LEVEL } from '../../../constants';

const Wrapper = styled.span``;

import MaterialDesignIcon from '../Icon/MaterialDesignIcon';

interface ProfileIconProps {
	level: number;
	size?: number;
	withLabel?: boolean;
}

const ProfileIcon = ({ level, size = 40, withLabel }: ProfileIconProps) => {
	const [type, setType] = useState(null);

	useMemo(() => {
		switch (level) {
			case USER_LEVEL.demo.id:
				setType('Face');
				break;
			case USER_LEVEL.redactor.id:
				setType('PermIdentity');
				break;
			case USER_LEVEL.chief_redactor.id:
				setType('SupervisorAccount');
				break;
			case USER_LEVEL.admin.id:
				setType('SupervisedUserCircle');
				break;
			case USER_LEVEL.super_admin.id:
				setType('VerifiedUser');
				break;
		}
	}, []);

	return (
		<Wrapper>
			<MaterialDesignIcon type={type} size={size} />
			{withLabel && <span></span>}
		</Wrapper>
	);
};

export default ProfileIcon;
