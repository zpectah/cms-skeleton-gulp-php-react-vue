import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Button } from '../ui';
import FileDropWrapper from './FileDropWrapper';
import ImageCrop from './ImageCrop';

const Wrapper = styled.div``;

const WrapperOptions = styled.div``;

const DropBlock = styled.div``;

const FileThumb = styled.div``;

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

const Uploader: React.FC<UploaderProps> = (props) => {
	const { onChange, onReset } = props;
	const { t } = useTranslation(['component']);

	const [tmp_src, setTmp_src] = useState(null); // image blob
	const [tmp_file, setTmp_file] = useState(null);

	/*

	- nejdříve zobrazit pole pro DROP

	- sledovat eventy - na drop a file ...

	* pokud bude soubor obrázek -> zobrazit CROP + (zároveň nechat obrázek jako DROP)

	* pokud bude soubor jiný než obrázek -> zobrazit ikonu a název souboru + (zároveň nechat náhled jako DROP)

	- sledovat další drop a podle toho opakovat ...

	*/

	const resetSrcHandler = () => {
		setTmp_src(null);
		setTmp_file(null);
		if (onReset) onReset();
	};

	const changeHandler = (blob, name, ext, mime, size, type) => {
		setTmp_src(blob);
		setTmp_file({
			blob: blob,
			name: name,
			ext: ext,
			mime: mime,
			size: size,
			type: type,
		});

		/*
		onChange(
			tmp_file.blob,
			tmp_file.name,
			tmp_file.ext,
			tmp_file.mime,
			tmp_file.size,
			tmp_file.type,
		);
		*/
	};

	const cropChangeHandler = (blob) => {
		console.log('cropChangeHandler', !!blob);
	};

	return (
		<Wrapper>
			<FileDropWrapper onChange={changeHandler} onReset={resetSrcHandler}>
				{({ fileType, dragOver }) => (
					<>
						{tmp_file && (
							<>
								{fileType == 'image' ? (
									<ImageCrop src={tmp_src} onChange={cropChangeHandler} />
								) : (
									<DropBlock>
										<FileThumb>...FileThumb...</FileThumb>
									</DropBlock>
								)}
							</>
						)}
					</>
				)}
			</FileDropWrapper>
		</Wrapper>
	);
};

export default Uploader;
