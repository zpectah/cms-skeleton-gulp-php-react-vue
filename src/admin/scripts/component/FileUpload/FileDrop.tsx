import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import getFileType from '../../utils/getFileType';
import { file as fileUtils } from '../../../../libs/js/utils';
import { Icon } from '../ui';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	position: relative;
	overflow: hidden;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
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
	color: ${(props) => (props.isDragOver ? 'white' : 'inherit')};
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
const DropArea = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

interface FileDropProps {
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
}

const FileDrop: React.FC<FileDropProps> = ({
	onChange,
	height = 250,
	accept,
}) => {
	const input = useRef();
	const [dragOver, setDragOver] = useState(false);
	const { t } = useTranslation(['component']);

	const callbackHandler = async (file) => {
		const blob = await fileUtils.toBase64(file);
		const ext = file.name.split('.').pop().toLowerCase();
		const type = getFileType(ext);

		if (accept) {
			console.log(accept);
			console.log(file.type);

			if (file.type.includes(accept.replace('*', ''))) {
				return onChange(blob, file.name, ext, file.type, file.size, type);
			} else {
				console.warn('Error !!!');
			}
		} else {
			return onChange(blob, file.name, ext, file.type, file.size, type);
		}
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
				height={height}
			>
				<Input
					type="file"
					name="FileUploader"
					accept={accept}
					ref={input}
					onChange={onChangeHandler}
				/>
				<DropArea>
					<Icon.Material type="CloudUpload" />
					{t('component:FileUpload.title.fileDrop')}
				</DropArea>
			</Label>
		</Wrapper>
	);
};

export default FileDrop;
