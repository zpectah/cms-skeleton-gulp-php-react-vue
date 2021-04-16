import React from 'react';
import styled from 'styled-components';

import Title from '../Typography/Title';

const Wrapper = styled.section`
	width: 100%;
	height: auto;
	padding-bottom: ${({ withBorder }) => (withBorder ? '1rem' : '0')};
	margin-bottom: 1.5rem;
	border-bottom: ${({ withBorder }) =>
		withBorder ? '1px solid rgba(200,200,200,.35)' : '0'};

	&:last-of-type {
		margin-bottom: 0;
	}
`;
const Heading = styled.div`
	& h3 {
	}
`;
const Content = styled.div``;

interface SectionProps {
	title?: string;
	withBorder?: boolean;
}

const Section: React.FC<SectionProps> = (props) => {
	const { children, title, withBorder = false } = props;

	return (
		<Wrapper withBorder={withBorder}>
			{title && (
				<Heading>
					<Title level={'h3'}>{title}</Title>
				</Heading>
			)}
			<Content>{children}</Content>
		</Wrapper>
	);
};

export default Section;
