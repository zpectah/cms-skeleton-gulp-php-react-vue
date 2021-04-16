import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
	width: 100%;
	height: auto;
	margin: ${({ radiusTop }) => (radiusTop ? '0' : '-1rem 0 0 0')};
	padding: 1.5rem;
	background-color: white;
	border-radius: ${({ radiusTop }) =>
		radiusTop ? '0.25rem' : '0 0 0.25rem 0.25rem'};
`;

interface CardProps {
	radiusTop?: boolean;
}

const Card: React.FC<CardProps> = (props) => {
	const { children, radiusTop } = props;

	return <CardWrapper radiusTop={radiusTop}>{children}</CardWrapper>;
};

export default Card;
