import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { message, Spin } from 'antd';

import api from '../../utils/api';
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
		_loading: boolean;
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
		this.props.dispatch(loadSettings());
	}

	updateData(data) {
		this.setState({ loading: true });
		return api.post('/api/update_settings', data).then(() => {
			message.success('Data was updated', 2.5);
			this.loadData();
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
				headerChildren={[
					<Button.Base
						key={1}
						onClick={() => this.loadData()}
						type={'primary'}
						loading={this.props._loading}
						ghost
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
						onUpdate={this.updateData.bind(this)}
					/>
				) : (
					<div>
						<Spin />
					</div>
				)}
			</AppLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		_Settings: state.app.Settings,
		_loading: state.ui.loadingData,
	};
}

const PageWithTranslations = withTranslation()(SettingsPage);

export default connect(mapStateToProps)(PageWithTranslations);
