import React from 'react';
import styled from 'styled-components';

import CFG from '../../../config/global.json';
import { getStyles } from '../utils/styles.theme';

const Wrapper = styled.footer`
	width: 100%;
	height: auto;
	padding: 1rem 1rem;
	display: flex;
	align-content: space-between;
	color: ${getStyles().layout.footer_text};
	background-color: ${getStyles().layout.footer_bg};
	border-top: 1px solid ${getStyles().layout.footer_border_color};
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
	route: {
		path: string | null;
		pathDetail: string | null;
		name: string;
		auth: number;
	};
}

const Footer: React.FC<FooterProps> = (props) => {
	const { children, route } = props;

	return (
		<Wrapper>
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
