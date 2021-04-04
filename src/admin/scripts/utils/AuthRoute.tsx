import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface AuthRouteProps {
	exact?: true | false;
	path: string | string[];
	component: any;
	auth: number;
}

const AuthRoute: React.FC<AuthRouteProps> = (props) => {
	const { exact, path, component, auth } = props;
	const [redirect, setRedirect] = useState<string | null>(null);
	const [userReady, setUserReady] = useState<boolean>(true); // TODO

	const authorizeAccess = () => {
		console.log('authorizeAccess');
	};

	// useEffect(authorizeAccess, [auth]);

	if (redirect) {
		return <Redirect to={redirect} />;
	} else if (userReady) {
		return <Route exact={exact} path={path} component={component} />;
	} else {
		return <>... preloader ...</>;
	}
};

export default AuthRoute;
