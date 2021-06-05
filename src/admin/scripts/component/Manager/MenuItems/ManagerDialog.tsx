import React, { useEffect, useState } from 'react';

import { Modal } from '../../ui';
import DialogForm from './DialogForm';
import { MenuItemsItemProps } from '../../../App/types';

interface ManagerDialogProps {
	isOpen: boolean;
	data: MenuItemsItemProps | any; // TODO
	onClose?: () => void;
	afterSubmit: (master, response) => void;
	menuId: number | string;
}

const ManagerDialog: React.FC<ManagerDialogProps> = ({
	isOpen,
	data,
	onClose,
	afterSubmit,
	menuId,
}) => {
	const [dialogOpen, setDialogOpen] = useState(false);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	const afterSubmitHandler = (master, response) => {
		setDialogOpen(false);
		afterSubmit(master, response);
	};

	const afterCloseHandler = () => {
		if (onClose) onClose();
	};

	useEffect(() => {
		setDialogOpen(isOpen);
	}, [isOpen]);

	return (
		<>
			<Modal.Base
				visible={dialogOpen}
				onCancel={toggleDialog}
				size={'lg'}
				afterClose={afterCloseHandler}
			>
				{data && (
					<DialogForm
						data={data}
						toggleDialog={toggleDialog}
						afterSubmit={afterSubmitHandler}
						menuId={menuId}
					/>
				)}
			</Modal.Base>
		</>
	);
};

export default ManagerDialog;
