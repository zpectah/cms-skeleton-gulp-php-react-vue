import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FileDrop from './FileDrop';
import ImageCrop from './ImageCrop';
import getFileType from '../../utils/getFileType';
import { Button } from '../ui';
import { file as fileUtils } from '../../../../libs/js/utils';

const Wrapper = styled.div`
	position: relative;
`;
const DropContainer = styled.div``;
const CropperContainer = styled.div``;
const OuterDropContainer = styled.div<{ dragOver: boolean }>``;

interface FileUploadProps {
	onChange: (
		blob: any, // TODO
		name: string,
		ext: string,
		mime: string,
		size: number,
		type: string,
		cropped?: any, // TODO
	) => void;
	onReset?: () => void;
	accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
	onChange,
	onReset,
	accept,
}) => {
	const [src, setSrc] = useState(null);
	const [file, setFile] = useState(null);
	const [fileType, setFileType] = useState(null);
	const [dragOver, setDragOver] = useState(false);

	const onSelectFile = (blob, name, ext, mime, size, type) => {
		setSrc(blob);
		setFile({
			blob: blob,
			name: name,
			ext: ext,
			mime: mime,
			size: size,
			type: type,
			cropped: null,
		});

		onChange(blob, name, ext, mime, size, type);
	};

	const onCropperChange = (blob) => {
		onChange(
			file?.blob,
			file?.name,
			file?.ext,
			file?.mime,
			file?.size,
			file?.type,
			blob,
		);
		setFile({
			...file,
			cropped: blob,
		});
	};

	useEffect(() => {
		setFileType(file?.type);
	}, [file?.type]);

	const callbackHandler = async (file) => {
		const blob = await fileUtils.toBase64(file);
		const ext = file.name.split('.').pop().toLowerCase();
		const type = getFileType(ext);

		if (accept) {
			if (file.type.includes(accept.replace('*', ''))) {
				if (type !== 'image') {
					setSrc(null);
					setFile(null);
					setFileType(null);
				}

				setSrc(blob);
				setFile({
					name: file.name,
					ext: file.ext,
					mime: file.type,
					size: file.size,
					type: type,
				});
			} else {
				console.warn('Error !!!');
			}
		} else {
			if (type !== 'image') {
				setSrc(null);
				setFile(null);
				setFileType(null);
			}

			setSrc(blob);
			setFile({
				name: file.name,
				ext: file.ext,
				mime: file.type,
				size: file.size,
				type: type,
			});
		}
	};

	const resetFile = () => {
		setSrc(null);
		setFile(null);
		setFileType(null);
		if (onReset) onReset();
	};

	const dragEvents = {
		onDrop: (e) => {
			e.preventDefault();
			if (fileType) {
				let file;

				if (e.dataTransfer.items) {
					file = e.dataTransfer.items[0].getAsFile();
				} else {
					file = e.dataTransfer.files[0];
				}

				setDragOver(false);

				if (file) return callbackHandler(file);
			}
		},
		onDragOver: (e) => {
			e.preventDefault();
		},
		onDragEnter: (e) => {
			e.preventDefault();
			if (fileType) setDragOver(true);
		},
		onDragLeave: (e) => {
			e.preventDefault();
			if (fileType) setDragOver(false);
		},
	};

	return (
		<Wrapper>
			{src && file ? (
				<OuterDropContainer {...dragEvents} dragOver={dragOver}>
					{file.type == 'image' ? (
						<CropperContainer>
							<ImageCrop src={src} onChange={onCropperChange}>
								<Button.Base type="primary" onClick={resetFile} ghost>
									Reset
								</Button.Base>
							</ImageCrop>
						</CropperContainer>
					) : (
						<>
							other file icon ... {file?.ext}
							<Button.Base type="primary" onClick={resetFile} ghost>
								Reset
							</Button.Base>
						</>
					)}
				</OuterDropContainer>
			) : (
				<DropContainer>
					<FileDrop onChange={onSelectFile} accept={accept} height={400} />
				</DropContainer>
			)}
		</Wrapper>
	);
};

export default FileUpload;
