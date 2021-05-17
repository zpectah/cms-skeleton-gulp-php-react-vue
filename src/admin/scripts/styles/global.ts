import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	html {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: 16px;
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

	.ant-modal {
		&-close {
			&-x {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 1.75rem;
			}
		}
		&-content {
			background: transparent;
		}
	}
`;
