import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import Login from '../../component/Login';

interface LoginPageProps {}
interface LoginPageState {}

class LoginPage extends Component<LoginPageProps & { t: any }, LoginPageState> {
	static props: LoginPageProps = {};
	state: LoginPageState = {};

	render() {
		return (
			<AppLayout
				route={routes.login}
				app={'App'}
				metaTitle={this.props.t('page:Login_meta_title')}
				footerWithBorder={false}
				withFooter
				footerCentered
				isCentered
			>
				<Login />
			</AppLayout>
		);
	}
}

export default withTranslation()(LoginPage);
