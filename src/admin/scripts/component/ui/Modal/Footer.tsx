import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
	width: 100%;
	height: auto;
	padding: 1.5rem;
	border-top: 1px solid rgba(200, 200, 200, 0.5);
`;

interface ModalFooterProps {}

const ModalFooter: React.FC<ModalFooterProps> = (props) => {
	const { children } = props;

	return <Wrapper>{children}</Wrapper>;
};

export default ModalFooter;
