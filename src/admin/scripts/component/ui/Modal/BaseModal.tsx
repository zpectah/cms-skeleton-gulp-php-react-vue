import React from 'react';
import { Modal as AntdModal, ModalProps } from 'antd'; // https://ant.design/components/modal/
import styled from 'styled-components';

import { BREAKPOINTS } from '../../../constants';
import Typography from '../Typography';
import Header from './Header';
import Icon from '../Icon';

const ModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: white;
	border-radius: 4px;
	overflow: hidden; // TODO: Test

	& .modal-heading-title {
		width: auto;
		height: auto;
		margin: 0;
		padding: 0;
		display: flex;
		font-size: 1.35rem;
		font-weight: 500;
	}

	& .modal-footer-block {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.modal-footer-column {
			margin-left: 0.5rem;
		}
	}
`;

interface BaseModalProps {
	visible: boolean;
	onCancel: (data) => void;
	afterClose?: () => void;
	modal?: ModalProps; // Antd BaseModal overrides
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
	title?: string;
	context?: 'default' | 'error' | 'success' | 'info';
	mask?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = (props) => {
	const {
		children,
		visible,
		onCancel,
		afterClose,
		modal,
		size = 'md',
		title,
		context = 'default',
		mask,
	} = props;

	const width = () => {
		switch (size) {
			case 'sm':
				return BREAKPOINTS.sm;

			case 'md':
				return BREAKPOINTS.md;

			case 'lg':
				return BREAKPOINTS.lg;

			case 'xl':
				return BREAKPOINTS.xl;

			case 'xxl':
				return BREAKPOINTS.xxl;
		}
	};

	return (
		<AntdModal
			closeIcon={<Icon.Material type="Close" size={30} />}
			bodyStyle={{
				padding: 0,
			}}
			wrapClassName="DialogCover"
			zIndex={1005}
			visible={visible}
			onCancel={onCancel}
			afterClose={afterClose}
			width={width()}
			centered={true}
			destroyOnClose={true}
			footer={null}
			mask={mask}
			{...modal}
		>
			<ModalWrapper>
				{title && (
					<Header context={context}>
						<Typography.Title level={'h3'}>{title}</Typography.Title>
					</Header>
				)}
				{children}
			</ModalWrapper>
		</AntdModal>
	);
};
export default BaseModal;
