import React from 'react';
import ReactMapGL from 'react-map-gl';
import styled from 'styled-components';

import { CMS_MAPBOX_TOKEN } from '../../../constants';

const Wrapper = styled.div`
	width: 100%;
	height: 200px;
`;

interface MapProps {}

const Map: React.FC<MapProps> = ({}) => {
	const [viewport, setViewport] = React.useState({
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 8,
		onClick: (e) => {
			console.log('e', e);
		},
	});

	return (
		<>
			<Wrapper>
				<ReactMapGL
					{...viewport}
					width="100%"
					height="100%"
					onViewportChange={(viewport) => setViewport(viewport)}
					mapboxApiAccessToken={CMS_MAPBOX_TOKEN}
				/>
			</Wrapper>
		</>
	);
};

export default Map;
