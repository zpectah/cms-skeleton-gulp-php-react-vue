import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import LostPassword from '../../component/LostPassword';

interface LostPasswordPageProps {}
interface LostPasswordPageState {}

class LostPasswordPage extends Component<
	LostPasswordPageProps & { t: any },
	LostPasswordPageState
> {
	static props: LostPasswordPageProps = {};
	state: LostPasswordPageState = {};

	render() {
		return (
			<AppLayout
				route={routes['lost-password']}
				app={'App'}
				metaTitle={this.props.t('page:LostPassword_meta_title')}
				isCentered
			>
				<LostPassword>
					<p>Logo & Description</p>
				</LostPassword>
			</AppLayout>
		);
	}
}

export default withTranslation()(LostPasswordPage);
