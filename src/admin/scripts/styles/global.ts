import { createGlobalStyle } from 'styled-components';

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
	.ant{

		// Button
		&-btn{
			border-radius: .125rem;

			&-primary{
				background: ${(props) => props.theme.color.primary};
				border-color: ${(props) => props.theme.color.primary};

				&:hover,
				&:active,
				&:focus{
					background: ${(props) => props.theme.color.primary}; // lighter
					border-color: ${(props) => props.theme.color.primary}; // lighter
				}

				&.ant-btn-background-ghost{
					color: ${(props) => props.theme.color.primary};
					border-color: ${(props) => props.theme.color.primary};

					&:hover,
					&:active,
					&:focus{
						background: transparent;
						color: ${(props) => props.theme.color.primary}; // darker
						border-color: ${(props) => props.theme.color.primary}; // darker
					}

				}

			}
		}

		// Modal
		&-modal{
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

	}

`;
