import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
`;
const CropperSource = styled.div`
	width: 50%;
	height: 50vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.ReactCrop {
		max-width: 80%;
		flex: none;
	}
`;
const CropperOutput = styled.div`
	width: 50%;
	height: 50vh;
	display: flex;
	flex-direction: column;
`;
const CropperMeta = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
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
		max-width: 80%;
		height: auto;
		display: block;
		flex: none;
	}
`;
const CropperAction = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

interface ImageCropperProps {
	onChange: (
		blob: any, // TODO
	) => void;
	src: any; // TODO
}

const ImageCropper: React.FC<ImageCropperProps> = ({
	children,
	onChange,
	src,
}) => {
	const [imageRef, setImageRef] = useState(null);
	const [fileBlob, setFileBlob] = useState(null);
	const [crop, setCrop] = useState({
		unit: 'px', // default, can be 'px' or '%'
		x: 0,
		y: 0,
		width: 200,
		height: 200,
	});

	const onImageLoaded = (image) => {
		setImageRef(image);
	};

	const onCropComplete = (crop) => {
		makeClientCrop(crop);
	};

	const onCropChange = (crop, percentCrop) => {
		setCrop(crop);
	};

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
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d');

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height,
		);

		return new Promise((resolve, reject) => {
			let blob = canvas.toDataURL();

			setFileBlob(blob);
			resolve(blob);

			return blob;
		});
	};

	useEffect(() => {
		if (imageRef) {
			setCrop({ ...crop, width: imageRef?.width, height: imageRef?.height });
			makeClientCrop({
				...crop,
				width: imageRef?.width,
				height: imageRef?.height,
			});
		}
	}, [src, imageRef]);

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
					/>
				)}
			</CropperSource>
			<CropperOutput>
				<CropperMeta>
					Width: {crop.width}| Height: {crop.height}
				</CropperMeta>
				<CropperThumbnail>
					{fileBlob && (
						<img src={fileBlob} style={{ maxWidth: '100%' }} alt="tmp_image" />
					)}
				</CropperThumbnail>
				<CropperAction>{children}</CropperAction>
			</CropperOutput>
		</Wrapper>
	);
};

export default ImageCropper;
