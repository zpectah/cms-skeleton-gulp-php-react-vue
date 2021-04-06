import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import routes from '../routes.json';
import Api from '../../utils/api';
import { setSettings } from '../../store/App/actions';
import AppLayout from '../../layout/AppLayout';
import Settings from '../../component/Settings';

interface SettingsPageProps {}
interface SettingsPageState {
	loading: boolean;
}

class SettingsPage extends Component<
	SettingsPageProps & {
		t: any;
		_Settings: any;
		dispatch: Function;
		match: any;
	},
	SettingsPageState
> {
	static props: SettingsPageProps = {};
	state: SettingsPageState = {
		loading: false,
	};

	loadData() {
		this.setState({ loading: true });
		Api.GET('http://skeleton-php-cms/api/get_settings').then((data) => {
			this.props.dispatch(setSettings(data.data));
			this.setState({ loading: false });
		});
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		const { loading } = this.state;

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
					model={this.props._Settings}
					loading={loading}
				/>
			</AppLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		_Settings: state.$App.Settings,
	};
}

const PageWithTranslations = withTranslation()(SettingsPage);

export default connect(mapStateToProps)(PageWithTranslations);
