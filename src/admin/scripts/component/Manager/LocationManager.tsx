import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { Marker } from 'react-map-gl';

import Map from '../ui/Map';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { MAPBOX_DEFAULTS } from '../../constants';
import Icon from '../ui/Icon';

const Wrapper = styled.div`
	width: 100%;
	display: flex;
`;
const ModalContent = styled.div`
	position: relative;
	overflow: hidden;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
`;
const StyledInput = styled(Input)`
	width: calc(100% - 1rem);
	margin-right: 1rem;
`;
const StyledMarker = styled(Marker)`
	width: 50px;
	height: 50px;
	background-color: transparent;
	border-radius: 50px;
`;

interface LocationManagerProps {
	value: [number | string, number | string];
	onChange: (value: any) => void;
	zoom?: number;
}

const LocationManager: React.FC<LocationManagerProps> = ({
	value,
	onChange,
	zoom,
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [locationChanged, setLocationChanged] = useState(false);
	const [tmpLocation, setTmpLocation] = useState<
		[number | string, number | string]
	>([MAPBOX_DEFAULTS.longitude, MAPBOX_DEFAULTS.latitude]);
	const [markerVisible, setMarkerVisible] = useState(false);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	const onSelectHandler = (e) => {
		setLocationChanged(true);
		setMarkerVisible(true);
		setTmpLocation([e.lngLat[0], e.lngLat[1]]);
	};

	const onConfirmLocation = () => {
		if (onChange) onChange([...tmpLocation]);

		onCancelHandler();
	};

	const onCancelHandler = () => {
		setTmpLocation([...value]);
		setLocationChanged(false);
		setDialogOpen(false);
	};

	useEffect(() => {
		if (value && value[0] && value[1]) setTmpLocation([...value]);
	}, [value]);

	const Markers = useMemo(() => {
		if (value[0] == 0 && value[1] == 0) {
			setMarkerVisible(false);
		} else {
			setMarkerVisible(true);
		}

		return (
			<>
				{markerVisible && (
					<>
						<StyledMarker
							longitude={Number(tmpLocation[0])}
							latitude={Number(tmpLocation[1])}
							offsetLeft={-25}
							offsetTop={-40}
						>
							<Icon.Material type={'Place'} />
						</StyledMarker>
					</>
				)}
			</>
		);
	}, [tmpLocation]);

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={onCancelHandler} size={'lg'}>
				<ModalContent>
					<Map
						zoom={zoom}
						longitude={Number(value[0]) || MAPBOX_DEFAULTS.longitude}
						latitude={Number(value[1] || MAPBOX_DEFAULTS.latitude)}
						height={'50vh'}
						onClick={onSelectHandler}
					>
						{Markers}
					</Map>
				</ModalContent>
				<Modal.Footer>
					<Button.Base onClick={onCancelHandler}>Cancel</Button.Base>
					<Button.Base
						type="primary"
						onClick={onConfirmLocation}
						disabled={!locationChanged}
					>
						Confirm location
					</Button.Base>
				</Modal.Footer>
			</Modal.Base>
			<Wrapper>
				<StyledInput
					value={value}
					type="text"
					readOnly
					onClick={toggleDialog}
				/>
				<Button.Base type="primary" onClick={toggleDialog} ghost>
					Select location
				</Button.Base>
				{/* TODO: small map if location is set? */}
			</Wrapper>
		</>
	);
};

export default LocationManager;
