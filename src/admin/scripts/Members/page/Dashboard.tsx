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
			app={'Members'}
			withSidebar
			widthHeader
			withFooter
			headerTitle={t('page:MembersDashboard.page.title')}
		>
			<Dashboard.Members />
		</AppLayout>
	);
};

export default DashboardPage;
