import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';

import getCroppedImg from './cropImage';

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
	}
	.ReactCrop__image {
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
const CropperControls = styled.div`
	width: 100%;
	min-height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 0;
	left: 0;
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
		max-width: 90%;
		height: auto;
		display: block;
	}
`;

interface ImageCropProps {
	onChange: (
		blob: any, // TODO
	) => void;
	src: any; // TODO
	aspect?: number;
}

const ImageCrop: React.FC<ImageCropProps> = ({ onChange, src, aspect }) => {
	const [crop, setCrop] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const [rotation, setRotation] = useState(0);
	const [croppedImage, setCroppedImage] = useState(null);
	const [area, setArea] = useState({ width: 0, height: 0 });
	const [tmpSrc, setTmpSrc] = useState(null);
	const [tmpAspect, setTmpAspect] = useState(4 / 3);

	const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
		setArea({
			width: croppedAreaPixels.width,
			height: croppedAreaPixels.height,
		});
		try {
			const croppedImage = await getCroppedImg(
				src,
				croppedAreaPixels,
				rotation,
			);

			setCroppedImage(croppedImage);
			onChange(croppedImage);
		} catch (e) {
			console.error(e);
		}
	}, []);

	const onImageLoad = useCallback((mediaSize) => {
		if (aspect) {
			setTmpAspect(aspect);
		} else {
			setTmpAspect(mediaSize.width / mediaSize.height);
		}
	}, []);

	useEffect(() => setTmpSrc(src), [src]);

	return (
		<Wrapper>
			<CropperSource>
				<Cropper
					image={tmpSrc}
					crop={crop}
					zoom={zoom}
					rotation={rotation}
					aspect={tmpAspect}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
					zoomWithScroll={false}
					onMediaLoaded={onImageLoad}
				/>
			</CropperSource>
			<CropperOutput>
				<CropperThumbnail>
					{croppedImage && <img src={croppedImage} alt={'cropped image'} />}
				</CropperThumbnail>
				<CropperMeta>
					<small>
						{area.width} x {area.height}
					</small>
				</CropperMeta>
				<CropperControls>
					<div>
						<input
							type="range"
							value={zoom}
							onChange={(e) => setZoom(Number(e.target.value))}
							min={1}
							max={3}
							step={0.1}
						/>
					</div>
					<div>...</div>
				</CropperControls>
			</CropperOutput>
		</Wrapper>
	);
};

export default ImageCrop;
