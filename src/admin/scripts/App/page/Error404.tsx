import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import { Typography } from '../../component/ui';

interface Error404PageProps {}
interface Error404PageState {}

class Error404Page extends Component<
	Error404PageProps & { t: any },
	Error404PageState
> {
	static props: Error404PageProps = {};
	state: Error404PageState = {};

	render() {
		return (
			<AppLayout
				route={routes['error-404']}
				app={'App'}
				metaTitle={this.props.t('page:Error404_meta_title')}
				isCentered
			>
				<Typography.Title level={'h1'}>
					{this.props.t('page:Error404_page_title')}
				</Typography.Title>
				<div>Error404Page</div>
			</AppLayout>
		);
	}
}

export default withTranslation()(Error404Page);
