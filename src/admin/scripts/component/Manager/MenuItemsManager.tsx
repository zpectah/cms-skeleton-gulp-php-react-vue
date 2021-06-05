import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useMenuItems } from '../../App/hooks';
import { Button, Modal } from '../ui';
import ManagerDialog from './MenuItems/ManagerDialog';
import { string } from '../../../../libs/js/utils';
import { SUBMIT_TIMEOUT } from '../../constants';
import { MenuItemsItemProps } from '../../App/types';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
`;
const DialogStructureWrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
`;
const SelectedStructureContainer = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 1rem 0;
`;

interface MenuItemsManagerProps {
	selected?: string[];
	menuId: number | string;
	onUpdate?: () => void;
}

const MenuItemsManager: React.FC<MenuItemsManagerProps> = ({
	selected = [],
	menuId,
}) => {
	const {
		MenuItems,
		updateMenuItems,
		createMenuItems,
		reloadMenuItems,
	} = useMenuItems();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogSubOpen, setDialogSubOpen] = useState(false);
	const [dialogSubData, setDialogSubData] = useState({
		is_new: true,
	});

	// TODO
	const [list, setList] = useState([]);
	const [listOrphans, setListOrphans] = useState([]);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	const openSubDialog = (data?: any) => {
		setDialogSubOpen(true);
		setDialogSubData(data);
	};

	const subDialogCloseHandler = () => {
		setDialogSubOpen(false);
		setDialogSubData(null);
	};

	// const submitHandler = (data: MenuItemsItemProps) => {
	// 	const master = {
	// 		...data,
	// 		name: string.replaceSpaces(data.name),
	// 	};
	//
	// 	if (data.is_new) {
	// 		createMenuItems(master).then((response) => {
	// 			// onSave(master, response);
	// 			// onCancel();
	// 		});
	// 	} else {
	// 		updateMenuItems(master).then((response) => {
	// 			// onSave(master, response);
	// 			// onCancel();
	// 		});
	// 	}
	//
	// 	console.log('.... submitted ....');
	//
	// 	// setTimeout(() => reloadMenuItems(), SUBMIT_TIMEOUT);
	// };

	const submitHandler = () => {
		setTimeout(() => reloadMenuItems(), SUBMIT_TIMEOUT);
	};

	useEffect(() => {
		if (MenuItems) {
			// TODO
			// set list by current menuId !!!
			// set listOrphans for menu items with no menuId

			let a = [];
			let b = [];

			MenuItems.map((menuItem) => {
				if (menuItem.menu == menuId) a.push(menuItem);
				if (menuItem.menu == '') b.push(menuItem);
			});

			setList(a);
			setListOrphans(b);
		}
	}, [MenuItems]);

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={toggleDialog} size={'xl'}>
				<Modal.Header>Menu items manager</Modal.Header>
				<Modal.Content>
					<DialogStructureWrapper>
						List of menu items for current menu ... {JSON.stringify(list)}
					</DialogStructureWrapper>
					<DialogStructureWrapper>
						List of orphans (menu items without menu) ...{' '}
						{JSON.stringify(listOrphans)}
					</DialogStructureWrapper>
					<Button.Base
						type="primary"
						onClick={() => openSubDialog({ is_new: true })}
					>
						Add new item
					</Button.Base>
				</Modal.Content>
				<Modal.Footer>
					<Button.Base onClick={toggleDialog}>Cancel</Button.Base>
					<Button.Base type="primary">Confirm</Button.Base>
				</Modal.Footer>
			</Modal.Base>
			<Wrapper>
				<Button.Base onClick={toggleDialog} type="primary" ghost>
					Menu items
				</Button.Base>
				<SelectedStructureContainer>
					... selected items structure ...
				</SelectedStructureContainer>
			</Wrapper>
			<ManagerDialog
				isOpen={dialogSubOpen}
				onClose={subDialogCloseHandler}
				data={dialogSubData}
				afterSubmit={submitHandler}
				menuId={menuId}
			/>
		</>
	);
};

export default MenuItemsManager;
