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
import BaseButton from '../ui/Button/BaseButton';

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
	menuId: number | string;
	onUpdate?: () => void;
	showOrphans?: boolean;
}

const MenuItemsManager: React.FC<MenuItemsManagerProps> = ({
	menuId,
	showOrphans,
}) => {
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

	const getItemChildren = (id: number | string) => {
		let a = [];
		MenuItems.map((item) => {
			if (item.parent == id) a.push(item);
		});
		return a;
	};

	const setItemsList = () => {
		let a = [];
		let b = [];

		MenuItems.map((menuItem) => {
			if (
				menuItem.menu == menuId &&
				(!menuItem.parent || menuItem.parent == '')
			)
				a.push(menuItem);
			if (showOrphans && menuItem.menu == '') b.push(menuItem);
		});

		setList(a);
		if (showOrphans) setListOrphans(b);
	};

	const renderMenuItem = (item, children) => (
		<MenuItem
			key={item.id}
			item={item}
			onSelect={itemSelectHandler}
			onToggle={itemToggleHandler}
			onDelete={itemDeleteHandler}
			children={children}
		/>
	);

	const renderMenuList = (itemsList: any[]) => {
		return itemsList.map((item) =>
			renderMenuItem(item, renderMenuList(getItemChildren(item.id))),
		);
	};

	useEffect(() => {
		if (MenuItems) setItemsList();
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
						<MenuItemsList>{renderMenuList(list)}</MenuItemsList>
					</DialogStructureWrapper>
					{showOrphans && (
						<DialogStructureWrapper>
							<MenuItemsList>{renderMenuList(listOrphans)}</MenuItemsList>
						</DialogStructureWrapper>
					)}
				</Modal.Content>
				<Modal.Footer>
					<div className="modal-footer-block">
						<Button.Base onClick={toggleDialog}>{t('btn.cancel')}</Button.Base>
					</div>
					<div className="modal-footer-block">
						<Button.Base
							type="primary"
							onClick={() => openSubDialog({ is_new: true })}
						>
							{t('component:MenuItemsManager.btn.createNew_item')}
						</Button.Base>
					</div>
				</Modal.Footer>
			</Modal.Base>
			<Wrapper>
				<Button.Base onClick={toggleDialog} type="primary" ghost size="small">
					{t('model.MenuItems')}
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
