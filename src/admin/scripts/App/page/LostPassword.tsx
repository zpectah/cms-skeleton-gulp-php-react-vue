import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../constants';
import AppLayout from '../../layout/AppLayout';
import LostPasswordForm from '../../component/LostPassword';

const LostPasswordPage = () => {
	const { t } = useTranslation('page');

	return (
		<AppLayout
			route={ROUTES.app['lost-password']}
			app={'App'}
			metaTitle={t('page:LostPassword.meta.title')}
			footerWithBorder={false}
			withFooter
			footerCentered
			isCentered
		>
			<LostPasswordForm>
				<img src={'../static/image/logo-default.svg'} alt="Logo" />
			</LostPasswordForm>
		</AppLayout>
	);
};

export default LostPasswordPage;
