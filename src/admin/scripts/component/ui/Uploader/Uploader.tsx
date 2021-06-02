import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import getFileType from '../../../utils/getFileType';

const Wrapper = styled.div<{ invisible: boolean }>`
	width: 100%;
	height: auto;
`;
const Label = styled.label<{ isDragOver: boolean; height: number }>`
	width: 100%;
	height: ${(props) => props.height}px;
	padding: 2rem 2rem;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-color: ${(props) =>
		props.isDragOver ? 'green' : 'rgb(200, 200, 200)'};
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
const DropArea = styled.div<{ invisible: boolean }>`
	${(props) =>
		props.invisible &&
		`
		background-color: red;
	`}
`;

interface UploaderProps {
	onChange: (
		blob: any, // TODO
		name: string,
		ext: string,
		mime: string,
		size: number,
		type: string,
	) => void;
	height?: number;
	accept?: string;
	invisible?: boolean;
}

const Uploader: React.FC<UploaderProps> = ({
	onChange,
	height = 250,
	accept,
	invisible = false,
}) => {
	const input = useRef();
	const [dragOver, setDragOver] = useState(false);

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const callbackHandler = async (file) => {
		const blob = await toBase64(file);
		const ext = file.name.split('.').pop().toLowerCase();
		const type = getFileType(ext);

		return onChange(blob, file.name, ext, file.type, file.size, type);
	};

	const onDropHandler = (e: any) => {
		e.preventDefault();

		let file;

		if (e.dataTransfer.items) {
			file = e.dataTransfer.items[0].getAsFile();
		} else {
			file = e.dataTransfer.files[0];
		}

		setDragOver(false);

		if (file) return callbackHandler(file);
	};

	const onChangeHandler = (e: any) => {
		const file = e.target?.files[0];

		if (file) return callbackHandler(file);
	};

	const onDragOverHandler = (e: any) => {
		e.preventDefault();
	};

	const onDragEnterHandler = (e: any) => {
		e.preventDefault();

		setDragOver(true);
	};

	const onDragLeaveHandler = (e: any) => {
		e.preventDefault();

		setDragOver(false);
	};

	return (
		<Wrapper invisible={invisible}>
			<Label
				onDrop={onDropHandler}
				onDragOver={onDragOverHandler}
				onDragEnter={onDragEnterHandler}
				onDragLeave={onDragLeaveHandler}
				isDragOver={dragOver}
				height={height}
			>
				<Input
					type="file"
					name="FileUploader"
					accept={accept}
					ref={input}
					onChange={onChangeHandler}
				/>
				<DropArea invisible={invisible}>...DropArea...</DropArea>
			</Label>
		</Wrapper>
	);
};

export default Uploader;
