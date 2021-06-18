import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { message } from 'antd';

import config from '../config';
import { useProfile } from '../App/hooks';
import Preloader from '../layout/common/Preloader';

interface AuthRouteProps {
	exact?: true | false;
	path: string | string[];
	component: any;
	auth: number;
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
	const { exact, path, component, auth } = props;
	const { Profile, isProfileLoading } = useProfile();
	const [redirect, setRedirect] = useState<string | null>(null);
	const [userReady, setUserReady] = useState<boolean>(true);

	const authorizeAccess = () => {
		const currentUser = Profile;

		if (!currentUser && !isProfileLoading) {
			setRedirect(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);

			return;
		} else if (currentUser && !isProfileLoading) {
			if (auth > currentUser.user_level) {
				message.error('Unauthorized access', 3.5);

				setRedirect(config.GLOBAL.CMS.RESTRICTED_REDIRECT_TARGET);
			}
		}

		setUserReady(true);
	};

	useEffect(authorizeAccess, [Profile, auth]);

	if (isProfileLoading) return <Preloader />;

	if (redirect) {
		return <Redirect to={redirect} />;
	} else if (userReady) {
		return <Route exact={exact} path={path} component={component} />;
	} else {
		return <Preloader />;
	}
};

export default AuthRoute;
