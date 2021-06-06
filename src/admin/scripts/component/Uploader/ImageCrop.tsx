import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { IMAGE_CROP_MIN_SIZE } from '../../constants';
import media from '../../styles/responsive';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;

	${media.min.md} {
		flex-direction: row;
	}
`;
const CropperSource = styled.div`
	width: 100%;
	min-height: 250px;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-color: rgba(25, 25, 25, 0.9);

	${media.min.md} {
		width: 50%;
		min-height: 50vh;
	}

	.ReactCrop {
		max-width: 75%;
		height: auto;
		flex: none;
	}
	.ReactCrop__image {
		display: block;
		flex: none;
		align-self: stretch;
		object-fit: contain;
	}
`;
const CropperOutput = styled.div`
	width: 100%;
	height: 250px;
	display: flex;
	flex-direction: column;
	position: relative;

	${media.min.md} {
		width: 50%;
		height: 50vh;
	}
`;
const CropperMeta = styled.div`
	width: 100%;
	min-height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;

	& small {
		padding: 0.5rem;
		background-color: rgb(250, 250, 250);
	}
`;
const CropperThumbnail = styled.div`
	width: 100%;
	height: auto;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	position: relative;
	overflow: hidden;

	img {
		display: block;
		flex: none;
		align-self: stretch;
		object-fit: contain;
	}
`;
const CropperAction = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
	left: 0;
`;

interface ImageCropProps {
	onChange: (
		blob: any, // TODO
	) => void;
	src: any; // TODO
	locked?: boolean;
	minWidth?: number;
	minHeight?: number;
	maxWidth?: number;
	maxHeight?: number;
	aspect?: number;
	avatarMaxSize?: number;
}

const ImageCrop: React.FC<ImageCropProps> = ({
	onChange,
	src,
	locked,
	minWidth = IMAGE_CROP_MIN_SIZE,
	minHeight = IMAGE_CROP_MIN_SIZE,
	maxWidth,
	maxHeight,
	aspect,
	avatarMaxSize,
}) => {
	const [imageRef, setImageRef] = useState(null);
	const [fileBlob, setFileBlob] = useState(null);
	const [crop, setCrop] = useState<{
		unit: 'px' | '%';
		x: number;
		y: number;
		width?: number;
		height?: number;
		aspect?: string | number | null;
	}>({
		unit: 'px', // default, can be 'px' or '%'
		x: 0,
		y: 0,
		aspect: aspect,
	});
	const { t } = useTranslation(['component']);

	const onImageLoaded = (image) => setImageRef(image);
	const onCropComplete = (crop) => makeClientCrop(crop);
	const onCropChange = (crop) => setCrop(crop);
	const makeClientCrop = async (crop) => {
		if (imageRef && crop.width && crop.height) {
			const tmp_croppedImageUrl = await getCroppedImage(
				imageRef,
				crop,
				'tmp.jpeg',
			);
			onChange(tmp_croppedImageUrl);
		}
	};
	const getCroppedImage = (image, crop, fileName) => {
		const canvas = document.createElement('canvas');
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext('2d');
		const w = avatarMaxSize ? avatarMaxSize : crop.width;
		const h = avatarMaxSize ? avatarMaxSize : crop.height;

		canvas.width = w;
		canvas.height = h;

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			w,
			h,
		);

		return new Promise((resolve, reject) => {
			let blob = canvas.toDataURL();

			setFileBlob(blob);
			resolve(blob);

			return blob;
		});
	};
	const setThumbnail = (aspect?: number) => {
		const w = imageRef?.width;
		const h = aspect ? imageRef?.width / aspect : imageRef?.height;

		setCrop({ ...crop, width: w, height: h });
		makeClientCrop({
			...crop,
			width: w,
			height: h,
		});
	};

	useEffect(() => {
		if (imageRef) setThumbnail(aspect);
	}, [imageRef]);

	return (
		<Wrapper>
			<CropperSource>
				{src && (
					<ReactCrop
						src={src}
						crop={crop}
						ruleOfThirds
						onImageLoaded={onImageLoaded}
						onComplete={onCropComplete}
						onChange={onCropChange}
						locked={locked}
						minWidth={minWidth}
						minHeight={minHeight}
						maxWidth={maxWidth}
						maxHeight={maxHeight}
					/>
				)}
			</CropperSource>
			<CropperOutput>
				<CropperThumbnail>
					{fileBlob ? (
						<img src={fileBlob} style={{ maxWidth: '100%' }} alt="tmp_image" />
					) : (
						<div>{t('component:FileUpload.title.fileCrop')}</div>
					)}
				</CropperThumbnail>
				<CropperMeta>
					<small>
						{crop.width} x {crop.height}
					</small>
				</CropperMeta>
			</CropperOutput>
		</Wrapper>
	);
};

export default ImageCrop;
