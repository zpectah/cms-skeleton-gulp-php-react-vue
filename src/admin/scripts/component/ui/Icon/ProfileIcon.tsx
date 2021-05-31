import React, { useMemo, useState } from 'react';

import MaterialDesignIcon from '../Icon/MaterialDesignIcon';

interface ProfileIconProps {
	level: number;
	size?: number;
}

const ProfileIcon = ({ level, size = 40 }: ProfileIconProps) => {
	const [type, setType] = useState(null);

	useMemo(() => {
		switch (level) {
			case 0:
				setType('Face');
				break;
			case 2:
				setType('PermIdentity');
				break;
			case 3:
				setType('SupervisorAccount');
				break;
			case 5:
				setType('SupervisedUserCircle');
				break;
			case 7:
				setType('VerifiedUser');
				break;
		}
	}, []);

	return <MaterialDesignIcon type={type} size={size} />;
};

export default ProfileIcon;
