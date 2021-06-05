import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

import { useMenuItems } from '../../App/hooks';
import { Button, Modal } from '../ui';
import ManagerDialog from './MenuItems/ManagerDialog';
import { string } from '../../../../libs/js/utils';
import { SUBMIT_TIMEOUT } from '../../constants';
import { MenuItemsItemProps } from '../../App/types';
import MenuItem from './MenuItems/MenuItem';

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
const MenuItemsList = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0 0 1rem 0;
	display: flex;
	flex-wrap: wrap;
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
	const { MenuItems, toggleMenuItems, reloadMenuItems } = useMenuItems();
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

	const afterSubmitHandler = () => {
		setTimeout(() => reloadMenuItems(), SUBMIT_TIMEOUT);
	};

	const itemSelectHandler = (item) => {
		console.log('itemSelectHandler ...', item);
		openSubDialog(item);
	};

	const itemToggleHandler = (id) => {
		toggleMenuItems([id]).then((resp) => {
			console.log('item updated ...', resp);

			reloadMenuItems();
		});
	};

	const itemDeleteHandler = (id) => {
		toggleMenuItems([id]).then((resp) => {
			console.log('item updated ...', resp);

			reloadMenuItems();
		});
	};

	const itemUpdateOrder = (item) => {
		console.log('itemUpdateOrder ...', item);
		// TODO
		// reloadMenuItems()
	};

	useEffect(() => {
		if (MenuItems) {
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
						<MenuItemsList>
							{list.map((item) => (
								<MenuItem
									key={item.id}
									item={item}
									onSelect={itemSelectHandler}
									onToggle={itemToggleHandler}
									onUpdateOrder={itemUpdateOrder}
									onDelete={itemDeleteHandler}
								/>
							))}
						</MenuItemsList>
					</DialogStructureWrapper>
					<DialogStructureWrapper>
						<MenuItemsList>
							{listOrphans.map((item) => (
								<MenuItem
									key={item.id}
									item={item}
									onSelect={itemSelectHandler}
									onToggle={itemToggleHandler}
									onUpdateOrder={itemUpdateOrder}
									onDelete={itemDeleteHandler}
									context="orphan"
								/>
							))}
						</MenuItemsList>
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
					{list.map((item) => (
						<Tag key={item.id}>{item.name}</Tag>
					))}
				</SelectedStructureContainer>
			</Wrapper>
			<ManagerDialog
				isOpen={dialogSubOpen}
				onClose={subDialogCloseHandler}
				data={dialogSubData}
				afterSubmit={afterSubmitHandler}
				menuId={menuId}
			/>
		</>
	);
};

export default MenuItemsManager;
