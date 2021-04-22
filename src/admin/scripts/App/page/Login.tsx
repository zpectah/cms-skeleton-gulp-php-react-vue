import React from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import Login from '../../component/Login';

const LoginPage = () => {
	const { t } = useTranslation('page');

	return (
		<AppLayout
			route={routes.login}
			app={'App'}
			metaTitle={t('page:Login.meta.title')}
			footerWithBorder={false}
			withFooter
			footerCentered
			isCentered
		>
			<Login>
				<p>Logo & Description</p>
			</Login>
		</AppLayout>
	);
};

export default LoginPage;
