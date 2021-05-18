import React from 'react';
import { useTranslation } from 'react-i18next';

import routes from '../../config.routes';
import AppLayout from '../../layout/AppLayout';
import Dashboard from '../../component/Dashboard';

const DashboardPage = () => {
	const { t } = useTranslation('page');

	return (
		<AppLayout
			route={routes.market.dashboard}
			app={'Market'}
			withSidebar
			widthHeader
			withFooter
			headerTitle={t('page:MarketDashboard.page.title')}
		>
			<Dashboard.Market />
		</AppLayout>
	);
};

export default DashboardPage;
