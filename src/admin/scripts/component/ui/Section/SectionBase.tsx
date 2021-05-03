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
	& p {
		color: rgba(25, 25, 25, 0.75);
	}
`;
const Content = styled.div``;

interface SectionProps {
	title?: string;
	subtitle?: string;
	description?: string;
	titleAnchor?: string;
	withBorder?: boolean;
}

const SectionBase: React.FC<SectionProps> = (props) => {
	const {
		children,
		title,
		subtitle,
		description,
		titleAnchor,
		withBorder = false,
	} = props;

	return (
		<Wrapper withBorder={withBorder}>
			{(title || subtitle) && (
				<Heading>
					{title && (
						<Title level={'h3'} id={titleAnchor}>
							{title}
						</Title>
					)}
					{subtitle && <Title level={'h5'}>{subtitle}</Title>}
					{description && <p>{description}</p>}
				</Heading>
			)}
			<Content>{children}</Content>
		</Wrapper>
	);
};

export default SectionBase;
