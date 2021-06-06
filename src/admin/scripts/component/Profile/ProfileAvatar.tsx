import React from 'react';

import { Avatar } from '../ui';
import { useProfile } from '../../App/hooks';

interface ProfileAvatarProps {
	size?: number;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ size = 40 }) => {
	const { Profile } = useProfile();

	return (
		<>
			<Avatar.Base size={size}>
				{Profile && (
					<>
						{Profile.img_avatar ? (
							<img src={Profile.img_avatar} alt="Temporary image" />
						) : (
							<>
								{Profile.first_name && Profile.last_name
									? Profile.first_name.charAt(0) + Profile.last_name.charAt(0)
									: Profile.nickname.charAt(0)}
							</>
						)}
					</>
				)}
			</Avatar.Base>
		</>
	);
};

export default ProfileAvatar;
