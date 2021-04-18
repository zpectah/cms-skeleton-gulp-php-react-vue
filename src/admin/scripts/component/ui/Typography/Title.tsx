import React from 'react';
import styled from 'styled-components';

const Heading = styled.span`
	width: 100%;
	height: auto;
	margin: 0;
	padding: ${({ noMargin }) => (noMargin ? '0' : '0.5rem 0 1rem 0')};

	&.as {
		&-h1 {
			font-size: 1.9rem;
		}
		&-h2 {
			font-size: 1.75rem;
		}
		&-h3 {
			font-size: 1.5rem;
		}
		&-h4 {
			font-size: 1.25rem;
		}
		&-h5 {
			font-size: 1.15rem;
		}
		&-h6 {
			font-size: 1rem;
		}
	}
`;

interface TitleProps {
	level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	id?: string;
	noMargin?: boolean;
}

const Title: React.FC<TitleProps> = (props) => {
	const { children, level, id, noMargin } = props;

	return (
		<Heading
			as={level}
			className={[`as-${level}`].join(' ')}
			id={id}
			noMargin={noMargin}
		>
			{children}
		</Heading>
	);
};

export default Title;
