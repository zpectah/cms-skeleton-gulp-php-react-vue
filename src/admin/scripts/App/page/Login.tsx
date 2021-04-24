import React from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import LoginForm from '../../component/LoginForm';

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
			<LoginForm>
				<p>Logo & Description</p>
			</LoginForm>
		</AppLayout>
	);
};

export default LoginPage;
