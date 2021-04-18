import React from 'react';
import { Modal } from 'antd'; // https://ant.design/components/modal/
import styled from 'styled-components';

import { appProps } from '../../types';
import { Button } from '../ui';

const Content = styled.div``;

interface DetailItemDialogProps {
	model: appProps['model'];
	isOpen: boolean;
	onCancel: (event) => void;
	detailData: any;
	onSave: (data) => void;
	onDelete: (data) => void;
	afterClose?: () => void;
}

const DetailDialog: React.FC<DetailItemDialogProps> = (props) => {
	const {
		model,
		isOpen,
		onCancel,
		detailData,
		onSave,
		onDelete,
		afterClose = () => null,
	} = props;

	return (
		<Modal
			visible={isOpen}
			onCancel={onCancel}
			wrapClassName="DialogCover"
			afterClose={afterClose}
			width={1000}
			centered
			destroyOnClose
			footer={[
				<Button.Base key="back" onClick={onCancel}>
					Cancel
				</Button.Base>,
				<Button.Base
					key="submit"
					type="primary"
					onClick={() => onSave(detailData)}
				>
					Submit
				</Button.Base>,
				!detailData?.is_new && (
					<Button.Base
						key="link"
						type="primary"
						onClick={() => onDelete(detailData)}
						danger
					>
						Delete
					</Button.Base>
				),
			]}
		>
			<Content>
				Detail item <br /> model: {model} <br /> {JSON.stringify(detailData)}
			</Content>
		</Modal>
	);
};

export default DetailDialog;