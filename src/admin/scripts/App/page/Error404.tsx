import React from 'react';
import { useTranslation } from 'react-i18next';
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

const Error404Page = () => {
	const { t } = useTranslation('page');

	return (
		<AppLayout
			route={routes['error-404']}
			app={'App'}
			metaTitle={t('page:Error404.meta.title')}
			isCentered
		>
			<Wrapper>
				<Typography.Title level={'h1'}>
					{t('page:Error404.page.title')}
				</Typography.Title>
				<div>Error404Page</div>
			</Wrapper>
		</AppLayout>
	);
};

export default Error404Page;
