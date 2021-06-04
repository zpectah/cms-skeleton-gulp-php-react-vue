import React, { useState } from 'react';
import styled from 'styled-components';

import { Modal, Icon, Button } from '../ui';
import FileUpload from './FileUpload';

const DialogContent = styled.div`
	width: 100%;
	height: auto;
`;
const AvatarWrapper = styled.div<{ size: number }>`
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

	& img {
		max-width: 100%;
		height: auto;
	}
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
	onChange?: (blob: any) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
	src,
	label,
	size = 50,
	onChange,
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [tmpBlob, setTmpBlob] = useState<any | null>(null);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	const uploaderHandler = (blob, name, ext, mime, size, type) => {
		setTmpBlob(blob);
	};

	const confirmHandler = () => {
		onChange(tmpBlob);
		closeHandler();
	};

	const closeHandler = () => {
		setTmpBlob(null);
		setDialogOpen(null);
	};

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={toggleDialog} size="xl">
				<DialogContent>
					<FileUpload
						onChange={uploaderHandler}
						accept="image/*"
						onReset={() => {
							setTmpBlob(null);
						}}
					/>
				</DialogContent>
				<Modal.Footer>
					<Button.Base onClick={closeHandler}>Close</Button.Base>
					<Button.Base
						type="primary"
						onClick={confirmHandler}
						disabled={!tmpBlob}
					>
						Confirm
					</Button.Base>
				</Modal.Footer>
			</Modal.Base>
			<AvatarTrigger type="button" size={size} onClick={toggleDialog}>
				<AvatarWrapper size={size}>
					{src ? <img src={src} alt="Temporary image" /> : <>{label}</>}
				</AvatarWrapper>
				<div className="avatar-change-popup">
					<Icon.Material type="Create" size={20} />
				</div>
			</AvatarTrigger>
		</>
	);
};

export default AvatarUploader;
