import React, { useEffect, useState } from 'react';

import { Button, Modal } from '../../ui';
import DialogForm from './DialogForm';
import { MenuItemsItemProps } from '../../../App/types';

interface ManagerDialogProps {
	isOpen: boolean;
	data: MenuItemsItemProps | any; // TODO
	onClose?: () => void;
	afterSubmit: Function;
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

	useEffect(() => {
		setDialogOpen(isOpen);
	}, [isOpen]);

	return (
		<>
			<Modal.Base
				visible={dialogOpen}
				onCancel={toggleDialog}
				size={'lg'}
				afterClose={() => {
					if (onClose) onClose();
				}}
			>
				{data && (
					<DialogForm
						data={data}
						toggleDialog={toggleDialog}
						afterSubmit={() => {
							console.log('... after submit');
							setDialogOpen(false);
							afterSubmit();
						}}
						menuId={menuId}
					/>
				)}
			</Modal.Base>
		</>
	);
};

export default ManagerDialog;
