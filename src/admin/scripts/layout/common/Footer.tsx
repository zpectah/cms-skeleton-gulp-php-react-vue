import React from 'react';
import styled from 'styled-components';

import CFG from '../../../../config/global.json';
import { getStyles } from '../../styles/theme';
import { routeProps } from '../../types';

const Wrapper = styled.footer`
	width: 100%;
	height: auto;
	padding: 1rem 1rem;
	display: flex;
	justify-content: ${(props) =>
		props.isCentered ? 'center' : 'space-between'};
	color: ${getStyles().layout.footer_text};
	background-color: ${getStyles().layout.footer_bg};

	&.with-border {
		border-top: 1px solid ${getStyles().layout.footer_border_color};
	}
`;
const Text = styled.p`
	margin: 0;
	padding: 0;
	font-size: 0.7rem;
	color: ${getStyles().layout.body_muted_text};

	& a {
		color: inherit;

		&: hover {
			color: ${getStyles().layout.link};
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
