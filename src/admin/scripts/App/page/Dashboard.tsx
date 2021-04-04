import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import Dashboard from '../../component/Dashboard';

interface DashboardPageProps {}
interface DashboardPagePState {}

class DashboardPage extends Component<
	DashboardPageProps & { t: any },
	DashboardPagePState
> {
	static props: DashboardPageProps = {};
	state: DashboardPagePState = {};

	render() {
		return (
			<AppLayout
				route={routes.dashboard}
				app={'App'}
				withSidebar
				widthHeader
				withFooter
				headerTitle={this.props.t('page:Dashboard_page_title')}
			>
				<Dashboard />
			</AppLayout>
		);
	}
}

export default withTranslation()(DashboardPage);
