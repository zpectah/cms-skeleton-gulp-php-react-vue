import React from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
	width: 100%;
	margin: 0.75rem auto;
	position: relative;
	border-color: transparent;

	&::before {
		content: '';
		width: 100%;
		height: 1px;
		position: absolute;
		background-color: rgba(100, 100, 100, 0.125);
	}
`;

interface HrProps {}

const Hr: React.FC<HrProps> = (props) => {
	const {} = props;

	return <StyledHr />;
};

export default Hr;
