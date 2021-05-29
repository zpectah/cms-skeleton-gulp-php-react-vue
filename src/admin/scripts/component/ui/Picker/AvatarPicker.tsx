import React, { useState } from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

import Modal from '../Modal';

const AvatarWrapper = styled.div<{ size: number; bgImage?: string }>`
	width: ${(props) => props.size}px;
	height: ${(props) => props.size}px;
	border-radius: ${(props) => props.size}px;
	position: relative;
	overflow: hidden;
	flex: none;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.25rem;
	font-weight: 500;
	background-color: rgba(200, 200, 200, 0.5);

	${(props) =>
		props.bgImage
			? `
		color: transparent;
		background: url(${props.bgImage}) no-repeat center center fixed;
		background-size: cover;
	`
			: `
		color: inherit;
	`}
`;
const AvatarTrigger = styled.button<{ size: number }>`
	width: ${(props) => props.size}px;
	height: ${(props) => props.size}px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: 0;
	background-color: transparent;
	outline: none;
	border-radius: ${(props) => props.size}px;
	position: relative;
	overflow: hidden;
	cursor: pointer;
`;

interface AvatarPickerProps {
	src?: string;
	label: string;
	size?: number;
	onChange?: (string) => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({
	src,
	label,
	size = 50,
	onChange,
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={toggleDialog}>
				<Modal.Content>
					<br />
					Picker avatar ... and crop ... then returns as base64
					<br />
				</Modal.Content>
			</Modal.Base>
			<AvatarTrigger type="button" size={size} onClick={toggleDialog}>
				<AvatarWrapper bgImage={src} size={size}>
					{label}
				</AvatarWrapper>
			</AvatarTrigger>
		</>
	);
};

export default AvatarPicker;
