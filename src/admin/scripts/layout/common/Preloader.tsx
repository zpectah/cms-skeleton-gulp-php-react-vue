import React from 'react';
import styled, { keyframes } from 'styled-components';

const PreloaderAnimation = keyframes`
  0% { width: 0%; left: 0%; }
  10% { width: 5%; left: 0%; }
  20% { width: 25%; left: 0%; }
  30% { width: 50%; left: 0%; }
  40% { width: 75%; left: 0%; }
  50% { width: 100%; left: 0%; }
  60% { width: 75%; left: 25%; }
  70% { width: 50%; left: 50%; }
  80% { width: 25%; left: 75%; }
  90% { width: 5%; left: 95%; }
  100% { width: 0%; left: 100%; }
`;
const PreloaderLayer = styled.div`
	width: 100%;
	height: 2px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	overflow: hidden;
	background-color: ${(props) => props.theme.color.primary};
`;
const PreloaderElement = styled.div`
	height: 100%;
	position: relative;
	background-color: blue;
	animation-name: ${PreloaderAnimation};
	animation-duration: 1s;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in-out;
`;

const Preloader: React.FC<{}> = ({ children }) => (
	<PreloaderLayer>{children ? children : <PreloaderElement />}</PreloaderLayer>
);

export default Preloader;
