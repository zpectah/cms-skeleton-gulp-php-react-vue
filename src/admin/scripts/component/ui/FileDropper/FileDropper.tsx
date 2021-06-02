import React, { useState } from 'react';
import styled from 'styled-components';

import Uploader from '../Uploader';
import ImageCropper from '../ImageCropper';

const Wrapper = styled.div`
	position: relative;
`;
const DropContainer = styled.div``;
const CropperContainer = styled.div``;
const ButtonReset = styled.button`
	width: auto;
	height: auto;
	padding: 1rem;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	display: flex;
	border: 0;
	outline: none;
	cursor: pointer;
	color: rgb(255, 255, 255);
	background-color: rgba(25, 25, 25, 0.5);
	opacity: 0.75;

	&:hover {
		opacity: 1;
	}
`;

interface FileDropperProps {
	onChange: (
		blob: any, // TODO
		name: string,
		ext: string,
		mime: string,
		size: number,
		type: string,
		cropped?: any, // TODO
	) => void;
	accept?: string;
}

const FileDropper: React.FC<FileDropperProps> = ({ onChange, accept }) => {
	const [src, setSrc] = useState(null);
	const [file, setFile] = useState(null);

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
		console.log(blob);
		onChange(
			file?.blob,
			file?.name,
			file?.ext,
			file?.mime,
			file?.size,
			file?.type,
			blob, // TODO -> new cropped image blob
		);

		setFile({
			...file,
			cropped: blob,
		});

		console.log(
			'image ',
			file?.name,
			file?.ext,
			file?.mime,
			file?.size,
			file?.type,
		);
	};

	return (
		<Wrapper>
			{file && (
				<ButtonReset
					type="button"
					onClick={() => {
						console.log(' ... reset blob ');
					}}
				>
					Clear
				</ButtonReset>
			)}
			<DropContainer>
				<Uploader
					onChange={onSelectFile}
					accept={accept}
					invisible={src && file?.type == 'image'}
				/>
			</DropContainer>
			{src && (
				<>
					{file?.type == 'image' ? (
						<CropperContainer>
							<ImageCropper src={src} onChange={onCropperChange} />
						</CropperContainer>
					) : (
						<>other file icon ...</>
					)}
				</>
			)}
		</Wrapper>
	);
};

export default FileDropper;
