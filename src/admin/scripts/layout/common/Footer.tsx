import React from 'react';
import styled from 'styled-components';

import CFG from '../../../../config/global.json';
import { routeProps } from '../../types';

const Wrapper = styled.footer`
	width: 100%;
	height: auto;
	padding: 1rem 1rem;
	display: flex;
	justify-content: ${(props) =>
		props.isCentered ? 'center' : 'space-between'};
	color: ${(props) => props.theme.footer.text};
	background-color: ${(props) => props.theme.footer.bg};

	&.with-border {
		border-top: 1px solid ${(props) => props.theme.footer.border};
	}
`;
const Text = styled.p`
	margin: 0;
	padding: 0;
	font-size: 0.7rem;
	color: ${(props) => props.theme.body.muted};

	& a {
		color: ${(props) => props.theme.body.link};

		&: hover {
			color: ${(props) => props.theme.body.linkHover};
		}
	}
`;

interface FooterProps {
	route: routeProps;
	withBorder?: boolean;
	isCentered?: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
	const { children, route, withBorder = true, isCentered = false } = props;

	return (
		<Wrapper
			className={[withBorder ? 'with-border' : ''].join(' ')}
			isCentered={isCentered}
		>
			<div>
				<Text>
					&copy; {new Date().getFullYear()} {CFG.CMS.META.name} | Developed
					by&nbsp;
					<a href={'http://www.zpecter.com/'} target="_blank">
						zpecter
					</a>
				</Text>
			</div>
			{children && <div>{children}</div>}
		</Wrapper>
	);
};

export default Footer;
