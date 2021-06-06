import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Modal, Icon, Button, Avatar } from '../ui';
import Uploader from './Uploader';

const DialogContent = styled.div`
	width: 100%;
	height: auto;
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
	onReset?: () => void;
	avatarFontSize?: string;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
	src,
	label,
	size = 50,
	onChange,
	onReset,
	avatarFontSize = '1.25rem',
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [tmpBlob, setTmpBlob] = useState<any | null>(null);
	const { t } = useTranslation(['common', 'component']);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	const onChangeHandler = (blob, name, ext, mime, size, type) =>
		setTmpBlob(blob);

	const confirmHandler = () => {
		onChange(tmpBlob);
		closeHandler();
	};

	const closeHandler = () => {
		setTmpBlob(null);
		setDialogOpen(null);
	};

	const resetHandler = () => {
		setDialogOpen(null);
		if (onReset) onReset();
	};

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={toggleDialog} size="xl">
				<DialogContent>
					<Uploader
						onChange={onChangeHandler}
						accept="image/*"
						onReset={() => {
							setTmpBlob(null);
						}}
						cropAspect={1 / 1}
						avatarMaxSize={250}
					/>
				</DialogContent>
				<Modal.Footer>
					<div className="modal-footer-block">
						<Button.Base onClick={closeHandler}>{t('btn.cancel')}</Button.Base>
					</div>
					<div className="modal-footer-block">
						{src && !tmpBlob && (
							<Button.Base onClick={resetHandler} danger ghost>
								{t('btn.reset')}
							</Button.Base>
						)}
						<div className="modal-footer-column">
							<Button.Base
								type="primary"
								onClick={confirmHandler}
								disabled={!tmpBlob}
							>
								{t('btn.confirm')}
							</Button.Base>
						</div>
					</div>
				</Modal.Footer>
			</Modal.Base>
			<AvatarTrigger type="button" size={size} onClick={toggleDialog}>
				<Avatar.Base size={size} fontSize={avatarFontSize}>
					{src ? <img src={src} alt="Temporary image" /> : <>{label}</>}
				</Avatar.Base>
				<div className="avatar-change-popup">
					<Icon.Material type="Create" size={20} />
				</div>
			</AvatarTrigger>
		</>
	);
};

export default AvatarUploader;
