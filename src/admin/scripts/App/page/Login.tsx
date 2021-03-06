import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import AppLayout from '../../layout/AppLayout';
import LoginForm from '../../component/Login';

const LoginPage = () => {
	const { t } = useTranslation('page');

	return (
		<AppLayout
			route={ROUTES.app.login}
			app={'App'}
			metaTitle={t('page:Login.meta.title')}
			footerWithBorder={false}
			withFooter
			footerCentered
			isCentered
		>
			<LoginForm>
				<img src={'../static/image/logo-default.svg'} alt="Logo" />
			</LoginForm>
		</AppLayout>
	);
};

export default LoginPage;
