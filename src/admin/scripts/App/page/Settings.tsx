import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import Settings from '../../component/Settings';
import { loadSettings } from '../../store/App/actions';
import { Button } from '../../component/ui';

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
	// constructor(props) {
	// 	super(props);
	// 	this.loadData.bind(this);
	// }

	static props: SettingsPageProps = {};
	state: SettingsPageState = {
		loading: false,
	};

	loadData() {
		this.props.dispatch(loadSettings());
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
				headerChildren={[
					<Button.Base
						key={1}
						onClick={() => this.loadData.bind(this)}
						type={'primary'}
					>
						Reload
					</Button.Base>,
				]}
			>
				{this.props._Settings ? (
					<Settings
						route={routes.settings}
						panelKey={this.props.match.params.panel}
						model={this.props._Settings}
						loading={loading}
					/>
				) : (
					<>...loading data...</>
				)}
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
