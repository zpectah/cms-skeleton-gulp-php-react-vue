import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
	width: 100%;
	height: auto;
	margin-bottom: 1.5rem;

	&:last-of-type {
		margin-bottom: 0;
	}
`;
const Heading = styled.div`
	& h3 {
		font-weight: 700;
	}
`;
const Content = styled.div``;

interface SectionProps {
	title?: string;
}

const Section: React.FC<SectionProps> = (props) => {
	const { children, title } = props;

	return (
		<Wrapper>
			{title && (
				<Heading>
					<h3>{title}</h3>
				</Heading>
			)}
			<Content>{children}</Content>
		</Wrapper>
	);
};

export default Section;
