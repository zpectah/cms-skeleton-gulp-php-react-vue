import { css } from 'styled-components';

export const AntdDefaults = css`
	// Button
	.ant-btn {
		border-radius: 0.125rem;

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
					border-color: ${(props) =>
						props.theme.button.primaryOutline.borderHover};
				}
				&:active,
				&:focus {
					color: ${(props) => props.theme.button.primaryOutline.textActive};
					background: ${(props) => props.theme.button.primaryOutline.bgActive};
					border-color: ${(props) =>
						props.theme.button.primaryOutline.borderActive};
				}
			}
		}
	}

	// Table
	.ant-table {
		&-body {
			margin-bottom: 1rem;
			overflow-x: auto;
		}
		&-wrapper {
		}
	}

	// Modal
	.ant-modal {
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
	.ant-input {
	}

	// Checkbox
	.ant-checkbox {
	}

	// Radio
	.ant-radio {
	}

	// Select
	.antd-select {
	}

	// Picker
	.ant-picker {
	}

	// Switch
	ant-switch {
	}

	// Tabs
	ant-tabs {
	}
`;
