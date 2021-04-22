import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Wrapper = styled.div`
	width: 100%;
	height: 50vh;
	min-height: 250px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PreloaderBlock: React.FC<{}> = () => {
	return (
		<Wrapper>
			<Spin />
		</Wrapper>
	);
};

export default PreloaderBlock;
