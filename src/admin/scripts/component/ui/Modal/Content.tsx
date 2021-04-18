import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	max-height: 70vh; // TODO: on mobile set to full height
	padding: 1.5rem;
	display: flex;
	position: relative;
	flex: 1;
	overflow-x: hidden;
	overflow-y: auto;
`;
const WrapperScrollable = styled.div`
	width: 100%;
	height: 100%;
`;

interface ModalContentProps {}

const ModalContent: React.FC<ModalContentProps> = (props) => {
	const { children } = props;

	return (
		<Wrapper>
			<WrapperScrollable>{children}</WrapperScrollable>
		</Wrapper>
	);
};

export default ModalContent;
