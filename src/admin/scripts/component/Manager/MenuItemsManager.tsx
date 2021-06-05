import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tag, message } from 'antd';

import { useMenuItems } from '../../App/hooks';
import { Button, Modal } from '../ui';
import ManagerDialog from './MenuItems/ManagerDialog';
import { SUBMIT_TIMEOUT } from '../../constants';
import MenuItem from './MenuItems/MenuItem';
import Confirm from '../Confirm';
import { useTranslation } from 'react-i18next';

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
	padding: 0 0 1rem 0;
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
	menuId: number | string;
	onUpdate?: () => void;
}

const MenuItemsManager: React.FC<MenuItemsManagerProps> = ({ menuId }) => {
	const { t } = useTranslation(['common', 'message', 'component', 'types']);
	const {
		MenuItems,
		toggleMenuItems,
		deleteMenuItems,
		reloadMenuItems,
	} = useMenuItems();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogSubOpen, setDialogSubOpen] = useState(false);
	const [dialogSubData, setDialogSubData] = useState({
		is_new: true,
	});
	const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
	const [confirmData, setConfirmData] = useState<any>(null);
	const [list, setList] = useState([]);
	const [listOrphans, setListOrphans] = useState([]);

	const toggleConfirm = () => setConfirmOpen(!confirmOpen);
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

	const itemSelectHandler = (item) => openSubDialog(item);

	const itemToggleHandler = (id) => {
		toggleMenuItems([id]).then((resp) => {
			message.success(t('message:success.items.update'), 2.5);

			reloadMenuItems();
		});
	};

	const itemDeleteHandler = (id) => {
		setConfirmData([id]);
		setConfirmOpen(true);
	};

	const itemDeleteConfirmHandler = (id) => {
		deleteMenuItems([id]).then((resp) => {
			message.success(t('message:success.items.delete'), 2.5);

			setConfirmOpen(false);
			setDialogSubOpen(false);
			setDialogSubData({
				is_new: true,
			});

			reloadMenuItems();
		});
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
				<Modal.Header>
					<div className="modal-heading-title">
						{t('component:MenuItemsManager.title')}
					</div>
				</Modal.Header>
				<Modal.Content>
					<DialogStructureWrapper>
						<MenuItemsList>
							{list.map((item) => (
								<MenuItem
									key={item.id}
									item={item}
									onSelect={itemSelectHandler}
									onToggle={itemToggleHandler}
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
						{t('component:MenuItemsManager.btn.createNew_item')}
					</Button.Base>
				</Modal.Content>
				<Modal.Footer>
					<div></div>
					<div>
						<Button.Base onClick={toggleDialog}>{t('btn.close')}</Button.Base>
					</div>
				</Modal.Footer>
			</Modal.Base>
			<Wrapper>
				<SelectedStructureContainer>
					{list.map((item) => (
						<Tag key={item.id}>{item.name}</Tag>
					))}
				</SelectedStructureContainer>
				<Button.Base onClick={toggleDialog} type="primary" ghost>
					{t('model.MenuItems')}
				</Button.Base>
			</Wrapper>
			<ManagerDialog
				isOpen={dialogSubOpen}
				onClose={subDialogCloseHandler}
				data={dialogSubData}
				afterSubmit={afterSubmitHandler}
				menuId={menuId}
				onDelete={itemDeleteHandler}
			/>
			<Confirm.Dialog
				isOpen={confirmOpen}
				onCancel={toggleConfirm}
				confirmData={confirmData}
				onConfirm={itemDeleteConfirmHandler}
			/>
		</>
	);
};

export default MenuItemsManager;
