import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
`;
const WrapperScrollable = styled.div`
	width: calc(100% + 30px);
	height: 100%;
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
`;
const WrapperContent = styled.div`
	width: calc(100% - 30px);
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
`;

interface BaseScrollableProps {}

const BaseScrollable: React.FC<BaseScrollableProps> = (props) => {
	const { children } = props;

	return (
		<Wrapper>
			<WrapperScrollable>
				<WrapperContent>{children}</WrapperContent>
			</WrapperScrollable>
		</Wrapper>
	);
};

export default BaseScrollable;
