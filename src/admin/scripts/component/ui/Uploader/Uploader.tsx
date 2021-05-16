import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import getFileType from './getFileType';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
`;
const Label = styled.label<{ isDragOver: boolean }>`
	width: 100%;
	height: 200px;
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
const DropArea = styled.div``;

interface UploaderProps {
	onChange: (
		blob: any, // TODO
		name: string,
		ext: string,
		mime: string,
		size: number,
		type: string,
	) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onChange }) => {
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
		const name = file.name;
		const ext = file.name.split('.').pop().toLowerCase();
		const mime = file.type;
		const size = file.size;
		const type = getFileType(ext);

		console.log('blob ', !!blob);

		return onChange(blob, name, ext, mime, size, type);
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
		<Wrapper>
			<Label
				onDrop={onDropHandler}
				onDragOver={onDragOverHandler}
				onDragEnter={onDragEnterHandler}
				onDragLeave={onDragLeaveHandler}
				isDragOver={dragOver}
			>
				<Input
					type="file"
					name="FileUploader"
					ref={input}
					onChange={onChangeHandler}
				/>
				<DropArea>...DropArea...</DropArea>
			</Label>
		</Wrapper>
	);
};

export default Uploader;
