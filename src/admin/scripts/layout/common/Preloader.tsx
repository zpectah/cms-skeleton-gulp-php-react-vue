import React from 'react';
import styled from 'styled-components';

import { base_1 } from '../../../../libs/svg/preloader';

const PreloaderLayer = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(250, 250, 250, 0.9);
`;

const Preloader: React.FC<{}> = ({ children }) => (
	<PreloaderLayer>
		{children ? children : <div dangerouslySetInnerHTML={{ __html: base_1 }} />}
	</PreloaderLayer>
);

export default Preloader;
