import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { message } from 'antd';

import { file as fileUtils } from '../../../../libs/js/utils';
import getFileType from '../../utils/getFileType';
import { Button } from '../ui';

const Wrapper = styled.div`
	min-height: 200px;
`;

const Content = styled.div``;

interface ContextProps {
	dragOver: boolean;
	fileType: string; // TODO
}

interface FileDropWrapperProps {
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
	accept?: string;
	onReset?: () => void;
}

const FileDropWrapper: React.FC<FileDropWrapperProps> = ({
	children,
	onChange,
	accept,
	onReset,
}) => {
	const [dragOver, setDragOver] = useState(false);
	const [file, setFile] = useState(null);
	const [fileType, setFileType] = useState('unknown');

	const Context = createContext<ContextProps>({
		dragOver: false,
		fileType: 'unknown',
	});

	const onDropHandler = async (file) => {
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
		}

		if (onChange)
			onChange(blob, file.name, file.ext, file.mime, file.size, file.type);
	};

	const dragEvents = {
		onDrop: (e) => {
			e.preventDefault();
			let file;

			if (e.dataTransfer.items) {
				file = e.dataTransfer.items[0].getAsFile();
			} else {
				file = e.dataTransfer.files[0];
			}

			setDragOver(false);

			if (file) return onDropHandler(file);
		},
		onDragOver: (e) => {
			e.preventDefault();
		},
		onDragEnter: (e) => {
			e.preventDefault();
			setDragOver(true);
		},
		onDragLeave: (e) => {
			e.preventDefault();
			setDragOver(false);
		},
	};

	const resetHandler = () => {
		setFile(null);
		setFileType(null);
		if (onReset) onReset();
	};

	// useEffect(() => {
	// 	if (onChange && file)
	// 		onChange(file.blob, file.name, file.ext, file.mime, file.size, file.type);
	// }, [file]);

	return (
		<>
			<Context.Provider
				value={{
					dragOver: dragOver,
					fileType: fileType,
				}}
			>
				<Wrapper {...dragEvents}>
					{file ? (
						<Content>
							{JSON.stringify(file?.size)}
							{/* TODO: resolve children function with props */}
							{/* @ts-ignore */}
							<Context.Consumer children={children} />
						</Content>
					) : (
						<Content>Drop or select file here ... (IMPORTANT)</Content>
					)}
					<div>
						<Button.Base onClick={resetHandler} disabled={!file}>
							Reset
						</Button.Base>
					</div>
				</Wrapper>
			</Context.Provider>
		</>
	);
};

export default FileDropWrapper;
