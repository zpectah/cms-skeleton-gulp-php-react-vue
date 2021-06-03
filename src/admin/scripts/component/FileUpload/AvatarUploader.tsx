import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal, Icon } from '../ui';
import FileUpload from './FileUpload';

const DialogContent = styled.div`
	width: 100%;
	height: auto;
`;
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

	.avatar-change-popup {
		width: ${(props) => props.size}px;
		height: ${(props) => props.size}px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(25, 25, 25, 0.5);
		border-radius: ${(props) => props.size}px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: inherit;
		opacity: 0;
		transition: opacity 0.25s ease-in-out 0s;

		& svg {
			fill: rgb(250, 250, 250);
		}
	}

	&:hover {
		.avatar-change-popup {
			opacity: 1;
		}
	}
`;

interface AvatarUploaderProps {
	src?: string;
	label: string;
	size?: number;
	onChange?: (string) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
	src,
	label,
	size = 50,
	onChange,
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	const uploaderHandler = (blob, name, ext, mime, size, type) => {
		console.log('uploaderHandler .......', name, ext, mime, size);
	};

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={toggleDialog} size="xl">
				<DialogContent>
					<FileUpload onChange={uploaderHandler} accept="image/*" />
				</DialogContent>
				<Modal.Footer>btn to close/cancel and confirm</Modal.Footer>
			</Modal.Base>
			<AvatarTrigger type="button" size={size} onClick={toggleDialog}>
				<AvatarWrapper bgImage={src} size={size}>
					{label}
				</AvatarWrapper>
				<div className="avatar-change-popup">
					<Icon.Material type="Add" size={20} />
				</div>
			</AvatarTrigger>
		</>
	);
};

export default AvatarUploader;
