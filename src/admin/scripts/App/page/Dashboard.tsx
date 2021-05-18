import React from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../../config.routes';
import AppLayout from '../../layout/AppLayout';
import Dashboard from '../../component/Dashboard';

const DashboardPage = () => {
	const { t } = useTranslation('page');

	return (
		<AppLayout
			route={routes.app.dashboard}
			app={'App'}
			withSidebar
			widthHeader
			withFooter
			headerTitle={t('page:Dashboard.page.title')}
		>
			<Dashboard.App />
		</AppLayout>
	);
};

export default DashboardPage;
