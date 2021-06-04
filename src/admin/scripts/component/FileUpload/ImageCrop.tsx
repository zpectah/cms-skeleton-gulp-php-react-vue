import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
`;
const CropperSource = styled.div`
	width: 50%;
	min-height: 50vh;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background-color: rgba(25, 25, 25, 0.9);

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
	width: 50%;
	height: 50vh;
	display: flex;
	flex-direction: column;
	position: relative;
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
	background-color: rgba(250, 250, 250, 0.75);
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
	background-color: rgba(25, 25, 25, 0.125);

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
	background-color: rgba(250, 250, 250, 0.75);
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
	children,
	onChange,
	src,
	locked,
	minWidth = 150,
	minHeight = 150,
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

	const setThumbnail = (asp?: number) => {
		const w = imageRef?.width;
		const h = asp ? imageRef?.width / asp : imageRef?.height;

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
						<div>create crop</div>
					)}
				</CropperThumbnail>
				<CropperMeta>
					<small>
						Width: {crop.width} &nbsp; Height: {crop.height}
					</small>
				</CropperMeta>
				<CropperAction>{children}</CropperAction>
			</CropperOutput>
		</Wrapper>
	);
};

export default ImageCrop;
