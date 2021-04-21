import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';

import routes from '../routes.json';
import AppLayout from '../../layout/AppLayout';
import { Typography } from '../../component/ui';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

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
				metaTitle={this.props.t('page:Error404.meta.title')}
				isCentered
			>
				<Wrapper>
					<Typography.Title level={'h1'}>
						{this.props.t('page:Error404.page.title')}
					</Typography.Title>
					<div>Error404Page</div>
				</Wrapper>
			</AppLayout>
		);
	}
}

export default withTranslation()(Error404Page);
