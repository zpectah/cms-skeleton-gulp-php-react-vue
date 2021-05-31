import { createGlobalStyle } from 'styled-components';

import { AntdDefaults } from './antd.theme';

export const REM = '16px';
export const SPACER = '1rem';
export const sidebarWidth = '250px';

export const GlobalStyles = createGlobalStyle`
	html {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: ${REM};
	}
	body {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: 1rem;
		color: ${(props) => props.theme.page.text};
		background-color: ${(props) => props.theme.page.background};
	}

	//
	.page {
	}

	//
	.app {
		height: 100%;
	}

	// Modal dialog blur background
	.DialogCover {
		&:last-of-type {
			backdrop-filter: blur(3px);
		}
	}

	.DialogWrapper {
	}

	// Antd overrides
	${AntdDefaults}

`;
