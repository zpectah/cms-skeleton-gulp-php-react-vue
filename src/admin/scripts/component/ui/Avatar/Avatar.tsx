import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ size: number; fontSize: string }>`
	width: ${(props) => props.size}px;
	height: ${(props) => props.size}px;
	border-radius: ${(props) => props.size}px;
	position: relative;
	overflow: hidden;
	flex: none;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${(props) => props.fontSize};
	font-weight: 500;
	background-color: rgba(200, 200, 200, 0.5);

	& img {
		max-width: 100%;
		height: auto;
		margin: 0;
		flex: none;
	}
`;

interface AvatarProps {
	size?: number;
	fontSize?: string;
}

const Avatar: React.FC<AvatarProps> = ({
	children,
	size = 40,
	fontSize = '1rem',
}) => {
	return (
		<Wrapper
			size={size}
			fontSize={fontSize}
			children={children}
			className="Avatar-wrapper"
		/>
	);
};

export default Avatar;
