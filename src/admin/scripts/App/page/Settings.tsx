import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import Settings from '../../component/Settings';

interface SettingsPageProps {}
interface SettingsPageState {}

class SettingsPage extends Component<
	SettingsPageProps & { t: any; match: any },
	SettingsPageState
> {
	static props: SettingsPageProps = {};
	state: SettingsPageState = {};

	render() {
		return (
			<AppLayout
				route={routes.settings}
				app={'App'}
				withSidebar
				widthHeader
				withFooter
				metaTitle={this.props.t('page:Settings_meta_title')}
				headerTitle={this.props.t('page:Settings_page_title')}
			>
				<Settings
					route={routes.settings}
					panelKey={this.props.match.params.panel}
				/>
			</AppLayout>
		);
	}
}

export default withTranslation()(SettingsPage);
