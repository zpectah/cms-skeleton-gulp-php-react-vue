import React, { DOMElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.span<{ size: number }>`
	width: ${(props) => props.size}px;
	height: ${(props) => props.size}px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: relative;

	& svg {
		width: 90%;
		height: 90%;
	}
`;

interface IconProps {
	source: string | DOMElement<any, any>;
	size?: number;
}

const Icon = ({ source, size = 50 }: IconProps) => {
	return <Wrapper dangerouslySetInnerHTML={{ __html: source }} size={size} />;
};

export default Icon;
