import React from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import Dashboard from '../../component/Dashboard';

const DashboardPage = () => {
	const { t } = useTranslation('page');

	return (
		<AppLayout
			route={routes.dashboard}
			app={'Crm'}
			withSidebar
			widthHeader
			withFooter
			headerTitle={t('page:CrmDashboard.page.title')}
		>
			<Dashboard.Crm />
		</AppLayout>
	);
};

export default DashboardPage;
