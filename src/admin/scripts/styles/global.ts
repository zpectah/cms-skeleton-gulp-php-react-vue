import { createGlobalStyle } from 'styled-components';

import { AntdDefaults } from './antd';

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

	/*
	.ant {
		// Input
		&-input {
			color: ${(props) => props.theme.form.input.text};
			background: ${(props) => props.theme.form.input.bg};
			border: 1px solid ${(props) => props.theme.form.input.border};

			&:hover{
				color: ${(props) => props.theme.form.input.textHover};
				background: ${(props) => props.theme.form.input.bgHover};
				border: 1px solid ${(props) => props.theme.form.input.borderHover};
				box-shadow: ${(props) => props.theme.form.input.shadowHover}; // TODO
			}

			&:focus,
			&:active,
			&-focused{
				color: ${(props) => props.theme.form.input.textActive};
				background: ${(props) => props.theme.form.input.bgActive};
				border: 1px solid ${(props) => props.theme.form.input.borderActive};
				box-shadow: ${(props) => props.theme.form.input.shadowActive}; // TODO
				outline: none;
			}

			&-password{
				color: ${(props) => props.theme.form.input.text};
				background: ${(props) => props.theme.form.input.bg};
				border: 1px solid ${(props) => props.theme.form.input.border};

				&.ant-input-affix-wrapper{
					&:hover{
						color: ${(props) => props.theme.form.input.textHover};
						background: ${(props) => props.theme.form.input.bgHover};
						border: 1px solid ${(props) => props.theme.form.input.borderHover};
						box-shadow: ${(props) => props.theme.form.input.shadowHover}; // TODO
					}
				}

				// TODO: hover, focus, active ...

			}

			&[disabled],
			&-disabled{
				opacity: .5;

				&:hover{
					opacity: .5;
					border-color: inherit;
				}
			}

		}

		&-checkbox{
			& .ant-checkbox-inner{
					background-color: transparent;
					border-color: ${(props) => props.theme.form.input.borderActive};

					&::after{
						border-color: ${(props) => props.theme.color.borderActive};
					}
			}

			&-checked{
				& .ant-checkbox-inner{
						background-color: ${(props) => props.theme.form.input.borderActive};
						border-color: ${(props) => props.theme.form.input.borderActive};

						&::after{
							border-color: ${(props) => props.theme.color.white};
						}
				}

				&.ant-checkbox-disabled{
					& .ant-checkbox-inner{
						border-color: ${(props) => props.theme.form.input.borderActive};
						opacity: .75;

						&::after{
							border-color: ${(props) => props.theme.color.white};
						}
					}
				}

			}

			&-wrapper{
				&:hover,
				&:active,
				&:focus{
					.ant-checkbox-inner{
							border-color: ${(props) => props.theme.form.input.borderActive};
					}
				}
			}

		}

		// Select
		&-select{

			&:not(.ant-select-customize-input) .ant-select-selector,
			&-selector{
				color: ${(props) => props.theme.form.input.text};
				background: ${(props) => props.theme.form.input.bg};
				border: 1px solid ${(props) => props.theme.form.input.border};

				&:hover{
					color: ${(props) => props.theme.form.input.textHover};
					background: ${(props) => props.theme.form.input.bgHover};
					border: 1px solid ${(props) => props.theme.form.input.borderHover};
					box-shadow: ${(props) => props.theme.form.input.shadowHover}; // TODO
				}

				&:focus,
				&:active,
				&-focused{
					color: ${(props) => props.theme.form.input.textActive};
					background: ${(props) => props.theme.form.input.bgActive};
					border: 1px solid ${(props) => props.theme.form.input.borderActive};
					/* box-shadow: ${(props) => props.theme.form.input.shadowActive}; */
					outline: none;
				}

			}

			&-open{
				color: ${(props) => props.theme.form.input.textActive};
				background: ${(props) => props.theme.form.input.bgActive};
				border-color: ${(props) => props.theme.form.input.borderActive};
				/* box-shadow: ${(props) => props.theme.form.input.shadowActive}; */
			}

		}

		// Picker
		&-picker{
			color: ${(props) => props.theme.form.input.text};
			background: ${(props) => props.theme.form.input.bg};
			border: 1px solid ${(props) => props.theme.form.input.border};

			&:hover{
				color: ${(props) => props.theme.form.input.textHover};
				background: ${(props) => props.theme.form.input.bgHover};
				border: 1px solid ${(props) => props.theme.form.input.borderHover};
				box-shadow: ${(props) => props.theme.form.input.shadowHover}; // TODO
			}

			&:focus,
			&:active,
			&-focused{
				color: ${(props) => props.theme.form.input.textActive};
				background: ${(props) => props.theme.form.input.bgActive};
				border: 1px solid ${(props) => props.theme.form.input.borderActive};
				box-shadow: ${(props) => props.theme.form.input.shadowActive}; // TODO
			}

		}

		// Switch
		&-switch{
			background-color: ${(props) => props.theme.color.grey}; // TODO
			&-checked{
				background-color: ${(props) => props.theme.button.primary.bg}; // TODO
			}

			&-handle{

			}
		}

		// Tabs
		&-tabs{
			&-ink{
				&-bar{
					background-color: ${(props) => props.theme.color.primary};
				}
			}

			&-tab{

				&:hover,
				&:focus,
				&:active{
					color: ${(props) => props.theme.color.primary};
				}

				&.ant-tabs-tab-active .ant-tabs-tab-btn{
					color: ${(props) => props.theme.color.primary};
				}
			}
		}

	}
	*/

`;
