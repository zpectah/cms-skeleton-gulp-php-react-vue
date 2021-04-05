import React from 'react';
import styled from 'styled-components';

import { minWidth } from '../../utils/styles.responsive';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: rgb(250, 250, 250);

	${minWidth.md} {
		width: 70vw;
		min-height: 500px;
		flex-direction: row;
	}
	${minWidth.lg} {
		width: 900px;
	}
`;
const BlockBrand = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const BlockForm = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const BlockInner = styled.div`
	width: auto;
`;

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
	const {} = props;

	return (
		<>
			<Wrapper>
				<BlockBrand>
					<BlockInner>Logo & Description</BlockInner>
				</BlockBrand>
				<BlockForm>
					<BlockInner>
						<>... Form login ...</>
					</BlockInner>
				</BlockForm>
			</Wrapper>
		</>
	);
};

export default Login;
