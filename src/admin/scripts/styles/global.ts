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
	.ant {

		// Button
		&-btn {
			border-radius: .125rem;

			&-primary {
				color: ${(props) => props.theme.button.primary.text};
				background: ${(props) => props.theme.button.primary.bg};
				border-color: ${(props) => props.theme.button.primary.border};

				&:hover {
					color: ${(props) => props.theme.button.primary.textHover};
					background: ${(props) => props.theme.button.primary.bgHover};
					border-color: ${(props) => props.theme.button.primary.borderHover};
				}
				&:active,
				&:focus {
					color: ${(props) => props.theme.button.primary.textActive};
					background: ${(props) => props.theme.button.primary.bgActive};
					border-color: ${(props) => props.theme.button.primary.borderActive};
				}

				&.ant-btn-background-ghost {
					color: ${(props) => props.theme.button.primaryOutline.text};
					background: ${(props) => props.theme.button.primaryOutline.bg};
					border-color: ${(props) => props.theme.button.primaryOutline.border};

					&:hover {
						color: ${(props) => props.theme.button.primaryOutline.textHover};
						background: ${(props) => props.theme.button.primaryOutline.bgHover};
						border-color: ${(props) => props.theme.button.primaryOutline.borderHover};
					}
					&:active,
					&:focus {
						color: ${(props) => props.theme.button.primaryOutline.textActive};
						background: ${(props) => props.theme.button.primaryOutline.bgActive};
						border-color: ${(props) => props.theme.button.primaryOutline.borderActive};
					}

				}

			}
		}

		// Table
		&-table {
			&-body {
				margin-bottom: 1rem;
				overflow-x: auto;
			}
			&-wrapper{}
		}

		// Modal
		&-modal {
			&-close {
				&-x {
					width: 40px;
					height: 40px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 1.45rem;
				}
			}
			&-content {
				background: transparent;
			}
		}

		// Input
		&-input {
				color: ${(props) => props.theme.form.input.text};
				background: ${(props) => props.theme.form.input.bg};
				border-color: ${(props) => props.theme.form.input.border};

				&:hover{
					color: ${(props) => props.theme.form.input.textHover};
					background: ${(props) => props.theme.form.input.bgHover};
					border-color: ${(props) => props.theme.form.input.borderHover};
					box-shadow: ${(props) => props.theme.form.input.shadowHover};
				}

				&:focus,
				&:active,
				&-focused{
					color: ${(props) => props.theme.form.input.textActive};
					background: ${(props) => props.theme.form.input.bgActive};
					border-color: ${(props) => props.theme.form.input.borderActive};
					box-shadow: ${(props) => props.theme.form.input.shadowActive};
				}

		}

	}

`;
