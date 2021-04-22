import React from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import LostPassword from '../../component/LostPassword';

const LostPasswordPage = () => {
	const { t } = useTranslation('page');

	return (
		<AppLayout
			route={routes['lost-password']}
			app={'App'}
			metaTitle={t('page:LostPassword.meta.title')}
			isCentered
		>
			<LostPassword>
				<p>Logo & Description</p>
			</LostPassword>
		</AppLayout>
	);
};

export default LostPasswordPage;
