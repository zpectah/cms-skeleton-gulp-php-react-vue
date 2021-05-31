import { css } from 'styled-components';

export const AntdDefaults = css`
	${(props) => `
	body {
		color: ${props.theme.body.text};
		background-color: ${props.theme.body.bg};
	}

	// Heading
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: ${props.theme.body.text};
	}

	// Link
	a {
		color: ${props.theme.link.default};
	}
	a:hover {
		color: ${props.theme.link.hover};
	}
	a:active {
		color: ${props.theme.link.active};
	}
	a:active,
	a:hover {
	}
	a:focus {
	}
	a[disabled] {
		color: ${props.theme.link.disabled};
	}

	// Caption
	caption {
		color: ${props.theme.body.muted};
	}

	// Mark
	mark {
		background-color: ${props.theme.color.grey.alpha(0.5)};
	}

	// Selection
	::-moz-selection,
	::selection {
		color: ${props.theme.page.selection.text};
		background: ${props.theme.page.selection.bg};
	}

	// Alert
	.ant-alert {
		color: ${props.theme._.alert.text.alpha(0.85)};
	}
	.ant-alert-success {
		background-color: ${props.theme._.alert.bg};
		border: ${props.theme._.alert.success.border};
	}
	.ant-alert-success .ant-alert-icon {
		color: ${props.theme._.alert.success.text};
	}
	.ant-alert-info {
		background-color: ${props.theme._.alert.bg};
		border: ${props.theme._.alert.info.border};
	}
	.ant-alert-info .ant-alert-icon {
		color: ${props.theme._.alert.info.text};
	}
	.ant-alert-warning {
		background-color: ${props.theme._.alert.bg};
		border: ${props.theme._.alert.warning.border};
	}
	.ant-alert-warning .ant-alert-icon {
		color: ${props.theme._.alert.warning.text};
	}
	.ant-alert-error {
		background-color: ${props.theme._.alert.bg};
		border: ${props.theme._.alert.error.border};
	}
	.ant-alert-error .ant-alert-icon {
		color: ${props.theme._.alert.error.text};
	}
	.ant-alert-close-icon .anticon-close {
		color: ${props.theme._.alert.text.alpha(0.45)};
	}
	.ant-alert-close-icon .anticon-close:hover {
		color: ${props.theme._.alert.text.alpha(0.75)};
	}
	.ant-alert-close-text {
		color: ${props.theme._.alert.text.alpha(0.45)};
	}
	.ant-alert-close-text:hover {
		color: ${props.theme._.alert.text.alpha(0.75)};
	}
	.ant-alert-with-description .ant-alert-message {
		color: ${props.theme._.alert.text.alpha(0.85)};
	}
	.ant-alert-message {
		color: ${props.theme._.alert.text.alpha(0.85)};
	}

	// Anchor
	.ant-anchor {
		color: ${props.theme._.anchor.text};
	}
	.ant-anchor-wrapper {
		background-color: ${props.theme._.anchor.bg};
	}
	.ant-anchor-ink::before {
		background-color: ${props.theme._.anchor.bg.darken(0.15)};
	}
	.ant-anchor-ink-ball {
		background-color: ${props.theme._.anchor.bg};
		border: ${props.theme._.anchor.border};
	}
	.ant-anchor-link-title {
		color: ${props.theme._.anchor.text};
	}
	.ant-anchor-link-active > .ant-anchor-link-title {
		color: ${props.theme._.anchor.textActive};
	}

	// Select
	.ant-select-auto-complete {
		color: ${props.theme._.input.text};
	}
	.ant-select-single.ant-select-open .ant-select-selection-item {
		color: ${props.theme._.select.single.item.text};
	}
	.ant-select-disabled.ant-select-multiple .ant-select-selector {
		background: ${props.theme._.input.bg};
	}
	.ant-select-multiple .ant-select-selection-item {
		background: ${props.theme._.input.bg};
		border: 1px solid ${props.theme._.input.bg};
	}
	.ant-select-disabled.ant-select-multiple .ant-select-selection-item {
		color: ${props.theme._.select.multiple.item.text};
		border-color: ${props.theme._.select.multiple.item.border};
	}
	.ant-select-multiple .ant-select-selection-item-remove {
		color: ${props.theme._.input.text};
	}
	.ant-select-multiple .ant-select-selection-item-remove:hover {
		color: ${props.theme._.input.text.alpha(0.15)};
	}
	.ant-select {
		color: ${props.theme._.input.text};
	}
	.ant-select:not(.ant-select-customize-input) .ant-select-selector {
		background-color: ${props.theme._.input.bg};
		border: ${props.theme._.input.border};
	}
	.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
		border-color: ${props.theme._.input.focus.border};
		box-shadow: ${props.theme._.input.focus.shadow};
	}
	.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
		color: ${props.theme._.input.disabled.text};
		background: ${props.theme._.input.disabled.bg};
	}
	.ant-select-multiple.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
		background: ${props.theme._.input.disabled.bg};
	}
	.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
		border-color: ${props.theme._.select.selector.border};
	}
	.ant-select-selection-placeholder {
		color: ${props.theme._.input.muted};
	}
	.ant-select-arrow {
		color: ${props.theme._.input.muted};
	}
	.ant-select-clear {
		color: ${props.theme._.input.muted};
		background: ${props.theme._.input.bg};
	}
	.ant-select-clear:hover {
		color: ${props.theme._.input.muted.alpha(0.25)};
	}
	.ant-select-dropdown {
		color: ${props.theme._.input.text};
		background-color: ${props.theme._.input.bg};
		box-shadow: ${props.theme._.select.dropdown.shadow};
	}
	.ant-select-dropdown-empty {
		color: ${props.theme._.input.muted};
	}
	.ant-select-item-empty {
		color: ${props.theme._.input.muted};
	}
	.ant-select-item {
		color: ${props.theme._.input.text};
	}
	.ant-select-item-group {
		color: ${props.theme._.input.muted};
	}
	.ant-select-item-option-active:not(.ant-select-item-option-disabled) {
		background-color: ${props.theme._.input.disabled.bg};
	}
	.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
		color: ${props.theme._.input.text};
		background-color: ${props.theme._.input.disabled.bg};
	}
	.ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state {
		color: ${props.theme._.input.active.text};
	}
	.ant-select-item-option-disabled {
		color: ${props.theme._.input.disabled.text};
	}

	// Empty
	.ant-empty-normal {
		color: ${props.theme.body.muted.alpha(0.5)};
	}
	.ant-empty-small {
		color: ${props.theme.body.muted.alpha(0.5)};
	}
	.ant-empty-img-default-ellipse {
		fill: #f5f5f5;
	}
	.ant-empty-img-default-path-1 {
		fill: #aeb8c2;
	}
	.ant-empty-img-default-path-2 {
		fill: url(#linearGradient-1);
	}
	.ant-empty-img-default-path-3 {
		fill: #f5f5f7;
	}
	.ant-empty-img-default-path-4 {
		fill: #dce0e6;
	}
	.ant-empty-img-default-path-5 {
		fill: #dce0e6;
	}
	.ant-empty-img-default-g {
		fill: #fff;
	}
	.ant-empty-img-simple-ellipse {
		fill: #f5f5f5;
	}
	.ant-empty-img-simple-g {
		stroke: #d9d9d9;
	}
	.ant-empty-img-simple-path {
		fill: #fafafa;
	}

	// Avatar
	.ant-avatar {
		color: ${props.theme.body.muted};
		background: ${props.theme.body.bg};
	}
	.ant-avatar-group .ant-avatar {
		border: 1px solid ${props.theme.body.bg.darken(0.15)};
	}

	// Popover
	.ant-popover {
		color: rgba(0, 0, 0, 0.85);
	}
	.ant-popover::after {
		background: rgba(255, 255, 255, 0.01);
	}
	.ant-popover-inner {
		background-color: #fff;
		box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
			0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
	}
	@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
		.ant-popover-inner {
			box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
				0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
		}
	}
	.ant-popover-title {
		color: rgba(0, 0, 0, 0.85);
		border-bottom: 1px solid #f0f0f0;
	}
	.ant-popover-inner-content {
		color: rgba(0, 0, 0, 0.85);
	}
	.ant-popover-message {
		color: rgba(0, 0, 0, 0.85);
	}
	.ant-popover-message > .anticon {
		color: #faad14;
	}
	.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow,
	.ant-popover-placement-topLeft > .ant-popover-content > .ant-popover-arrow,
	.ant-popover-placement-topRight > .ant-popover-content > .ant-popover-arrow {
		border-right-color: #fff;
		border-bottom-color: #fff;
		box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
	}
	.ant-popover-placement-right > .ant-popover-content > .ant-popover-arrow,
	.ant-popover-placement-rightTop > .ant-popover-content > .ant-popover-arrow,
	.ant-popover-placement-rightBottom
		> .ant-popover-content
		> .ant-popover-arrow {
		border-bottom-color: #fff;
		border-left-color: #fff;
		box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
	}
	.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow,
	.ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow,
	.ant-popover-placement-bottomRight
		> .ant-popover-content
		> .ant-popover-arrow {
		border-top-color: #fff;
		border-left-color: #fff;
		box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
	}
	.ant-popover-placement-left > .ant-popover-content > .ant-popover-arrow,
	.ant-popover-placement-leftTop > .ant-popover-content > .ant-popover-arrow,
	.ant-popover-placement-leftBottom
		> .ant-popover-content
		> .ant-popover-arrow {
		border-top-color: #fff;
		border-right-color: #fff;
		box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
	}

	// Back top
	.ant-back-top {
		color: rgba(0, 0, 0, 0.85);
	}
	.ant-back-top-content {
		color: #fff;
		background-color: rgba(0, 0, 0, 0.45);
	}
	.ant-back-top-content:hover {
		background-color: rgba(0, 0, 0, 0.85);
	}

	// ...

	.ant-badge{ /* TODO ... */ }


	`}

	//
	//
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

export const AntdOverrides = css``;
