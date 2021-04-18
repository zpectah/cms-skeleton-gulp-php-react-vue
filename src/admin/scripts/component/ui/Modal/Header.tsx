import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
	width: 100%;
	height: auto;
	padding: 1.5rem;
	border-bottom: 1px solid rgba(200, 200, 200, 0.5);
`;

interface ModalHeaderProps {
	context?: 'default' | 'error' | 'success' | 'info';
}

const ModalHeader: React.FC<ModalHeaderProps> = (props) => {
	const { children, context = 'default' } = props;

	return <Wrapper context={context}>{children}</Wrapper>;
};

export default ModalHeader;
