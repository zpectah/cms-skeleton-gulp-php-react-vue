import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from 'antd';
import styled from 'styled-components';

import { Typography } from '../../component/ui';
import { routeProps, appProps } from '../../types';

const Wrapper = styled.header`
	width: 100%;
	height: auto;
	padding: 1rem 1rem;
	color: ${(props) => props.theme.footer.text};
	background-color: ${(props) => props.theme.footer.bg};
	border-bottom: 1px solid ${(props) => props.theme.footer.border};
`;
const PrimaryBlock = styled.div``;
const SecondaryBlock = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	justify-content: space-between;
`;
const SecondarySubBlock = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

interface HeaderProps {
	route: routeProps;
	app: appProps['app'];
	headerTitle?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
	const { t, i18n } = useTranslation();
	const params: any = useParams();
	const { children, headerTitle, route, app } = props;

	return (
		<Wrapper>
			<PrimaryBlock>
				<Breadcrumb>
					<Breadcrumb.Item>{i18n.language}</Breadcrumb.Item>
					{app !== 'App' ? (
						<>
							<Breadcrumb.Item>App</Breadcrumb.Item>
							<Breadcrumb.Item>{app}</Breadcrumb.Item>
						</>
					) : (
						<Breadcrumb.Item>{app}</Breadcrumb.Item>
					)}
					<Breadcrumb.Item>{t(`page:${route.label}`)}</Breadcrumb.Item>
					{(params.id || params.panel) && (
						<Breadcrumb.Item>{params.id || params.panel}</Breadcrumb.Item>
					)}
				</Breadcrumb>
			</PrimaryBlock>
			<SecondaryBlock>
				<SecondarySubBlock>
					{headerTitle && (
						<Typography.Title level={'h1'}>{headerTitle}</Typography.Title>
					)}
				</SecondarySubBlock>
				{children && <SecondarySubBlock>{children}</SecondarySubBlock>}
			</SecondaryBlock>
		</Wrapper>
	);
};

export default Header;
