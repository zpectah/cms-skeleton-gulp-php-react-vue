import React from 'react';
import { Modal as AntdModal, ModalProps } from 'antd'; // https://ant.design/components/modal/
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

import { BREAKPOINTS } from '../../../constants';
import Typography from '../Typography';
import Header from './Header';

const ModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	background-color: white;
	border-radius: 4px;
`;
const ModalCloseIcon = styled(MdClose)``;

interface BaseModalProps {
	visible: boolean;
	onCancel: (data) => void;
	afterClose?: () => void;
	modal?: ModalProps; // Antd Modal overrides
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
	title?: string;
	context?: 'default' | 'error' | 'success' | 'info';
}

const Modal: React.FC<BaseModalProps> = (props) => {
	const {
		children,
		visible,
		onCancel,
		afterClose,
		modal,
		size = 'md',
		title,
		context = 'default',
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
			closeIcon={<ModalCloseIcon />}
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
export default Modal;
