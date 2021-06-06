import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import { file as fileUtils } from '../../../../libs/js/utils';
import getFileType from '../../utils/getFileType';
import { Button, Icon } from '../ui';
import ImageCrop from './ImageCrop';

const Wrapper = styled.div<{ height: number }>`
	min-height: ${(props) => props.height}px;
	position: relative;
`;
const Content = styled.div<{ height: number }>`
	min-height: ${(props) => props.height}px;
	position: relative;
`;
const FileThumb = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: rgb(200, 200, 200);

	& p {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
`;

const Label = styled.label`
	width: 100%;
	height: 100%;
	padding: 2rem 2rem;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	color: inherit;
	background-color: rgb(200, 200, 200);
`;
const Input = styled.input`
	width: 1px;
	height: 1px;
	display: block;
	position: absolute;
	bottom: 0;
	right: 0;
	opacity: 0;
`;
const DropArea = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const DraggableLayer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	color: white;
	background-color: rgba(25, 25, 25, 0.75);
`;

interface UploaderProps {
	onChange: (
		blob: any, // TODO
		name: string,
		ext: string,
		mime: string,
		size: number,
		type: string,
		cropped?: any, // TODO
	) => void;
	height?: number;
	onReset?: () => void;
	accept?: string;
	cropAspect?: number;
	cropAspectLocked?: boolean;
	cropMinWidth?: number;
	cropMinHeight?: number;
	cropMaxWidth?: number;
	cropMaxHeight?: number;
	avatarMaxSize?: number;
}

const Uploader: React.FC<UploaderProps> = ({
	onChange,
	accept,
	onReset,
	height = 400,
	cropAspect,
	cropAspectLocked,
	cropMinWidth,
	cropMinHeight,
	cropMaxWidth,
	cropMaxHeight,
	avatarMaxSize,
}) => {
	const { t } = useTranslation(['component']);
	const [dragOver, setDragOver] = useState(false);
	const [file, setFile] = useState(null);
	const [src, setSrc] = useState(null);
	const [fileType, setFileType] = useState('unknown');

	const setBlobSource = async (file) => {
		const blob = await fileUtils.toBase64(file);
		const ext = file.name.split('.').pop().toLowerCase();
		const type = getFileType(ext);
		setFileType(type);

		if (accept) {
			if (file.type.includes(accept.replace('*', ''))) {
				setFile({
					blob: blob,
					name: file.name,
					ext: file.ext,
					mime: file.type,
					size: file.size,
					type: type,
				});
				if (type == 'image') setSrc(blob);
			} else {
				message.warn('This file type is not accepted!', 5);
			}
		} else {
			setFile({
				blob: blob,
				name: file.name,
				ext: file.ext,
				mime: file.type,
				size: file.size,
				type: type,
			});
			if (type == 'image') setSrc(blob);
		}

		onChange(blob, file.name, file.ext, file.mime, file.size, file.type);
	};

	const dragEvents = {
		onDrop: (e) => {
			e.stopPropagation();
			e.preventDefault();

			let file;

			if (e.dataTransfer.items) {
				file = e.dataTransfer.items[0].getAsFile();
			} else {
				file = e.dataTransfer.files[0];
			}

			setDragOver(false);
			setFile(null);
			setFileType('unknown');

			if (file) return setBlobSource(file);
		},
		onDragOver: (e) => {
			e.stopPropagation();
			e.preventDefault();

			return false;
		},
		onDragEnter: (e) => {
			e.stopPropagation();
			e.preventDefault();

			setDragOver(true);

			return false;
		},
		onDragLeave: (e) => {
			e.stopPropagation();
			e.preventDefault();

			setDragOver(false);

			return false;
		},
	};

	const inputEvents = {
		onChange: (e) => {
			let file = e.target?.files[0];

			setFile(null);
			setFileType('unknown');

			if (file) return setBlobSource(file);
		},
	};

	const resetHandler = () => {
		setFile(null);
		setFileType('unknown');
		if (onReset) onReset();
	};

	const cropChangeHandler = (blob) => {
		onChange(blob, file.name, file.ext, file.mime, file.size, file.type);
	};

	const windowEventsInit = () => {
		window.addEventListener('mouseup', dragEvents.onDragLeave);
		window.addEventListener('dragover', dragEvents.onDragOver);
		window.addEventListener('dragenter', dragEvents.onDragEnter);
		window.addEventListener('drop', dragEvents.onDrop);
	};

	const windowEventsDestroy = () => {
		window.removeEventListener('mouseup', dragEvents.onDragLeave);
		window.removeEventListener('dragover', dragEvents.onDragOver);
		window.removeEventListener('dragenter', dragEvents.onDragEnter);
		window.removeEventListener('drop', dragEvents.onDrop);
	};

	useEffect(() => {
		windowEventsInit();

		return () => windowEventsDestroy();
	}, []);

	return (
		<>
			{dragOver && (
				<DraggableLayer onDragLeave={dragEvents.onDragLeave}>
					<DropArea>
						<Icon.Material type="Add" />
						{t('component:FileUpload.title.fileDrop')}
					</DropArea>
				</DraggableLayer>
			)}
			<Wrapper height={height}>
				<Content height={height}>
					{file ? (
						<>
							{fileType == 'image' && src ? (
								<ImageCrop
									src={src}
									onChange={cropChangeHandler}
									aspect={cropAspect}
									locked={cropAspectLocked}
									minWidth={cropMinWidth}
									minHeight={cropMinHeight}
									maxWidth={cropMaxWidth}
									maxHeight={cropMaxHeight}
									avatarMaxSize={avatarMaxSize}
								/>
							) : (
								<FileThumb>
									<p>
										<Icon.FileType type={file.type} />
										<small>{file.name}</small>
									</p>
								</FileThumb>
							)}
						</>
					) : (
						<Label>
							<Input
								type="file"
								name="FileUploader"
								accept={accept}
								{...inputEvents}
							/>
							<DropArea>
								<Icon.Material type="CloudUpload" />
								{t('component:FileUpload.title.fileUpload')}
							</DropArea>
						</Label>
					)}
				</Content>
				<div>
					<Button.Base onClick={resetHandler} disabled={!file}>
						Reset
					</Button.Base>
					{file?.type == 'image' && <div>... options for image crop</div>}
				</div>
			</Wrapper>
		</>
	);
};

export default Uploader;
