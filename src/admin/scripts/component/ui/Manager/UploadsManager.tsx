import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useUploads } from '../../../App/hooks';
import Modal from '../Modal';
import BaseButton from '../Button/BaseButton';
import { UploadsItemProps } from '../../../App/types';
import config from '../../../config';
import { isArray } from 'util';

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
	padding: 1rem;
`;
const SelectedStructureContainer = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 1rem 0;
`;
const DialogList = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;
const DialogListItem = styled.button<{ selected?: boolean }>`
	width: 25%;
	height: auto;
	min-height: 150px;
	margin: 0;
	padding: 1rem 1rem;
	flex: none;
	display: flex;
	align-items: center;
	justify-content: center;
	color: inherit;
	background-color: ${(props) =>
		props.selected ? 'rgba(200, 200, 200, 0.5)' : 'rgba(200, 200, 200, 0.25)'};
	outline: none;
	border: 0;
	cursor: pointer;

	& .img,
	& .span {
		margin: 0;
		display: block;
		flex: none;
	}

	& .img {
		max-width: 100%;
		height: auto;
	}
`;
const SelectedList = styled.ul``;
const SelectedListItem = styled.li``;

interface UploadsManagerProps {
	selected?: string[] | string;
	onChange?: (selected: string[]) => void;
	single?: boolean;
	type?: 'all' | UploadsItemProps['type'];
}

const UploadsManager: React.FC<UploadsManagerProps> = ({
	selected = [] || '',
	onChange,
	single = false,
	type = 'all',
}) => {
	const { Uploads } = useUploads();
	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [items, setItems] = useState<any[]>([]);
	const [itemsSelected, setItemsSelected] = useState<any[]>([]);
	const [tmpItemsSelected, setTmpItemsSelected] = useState<any[]>([]);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	const setInitialItems = () => {
		let tmp_items = [];
		let tmp_selected = [];

		Uploads?.map((item) => {
			switch (type) {
				case 'image':
					if (item.type == 'image') tmp_items.push(item);
					break;

				case 'audio':
					if (item.type == 'audio') tmp_items.push(item);
					break;

				case 'video':
					if (item.type == 'video') tmp_items.push(item);
					break;

				case 'document':
					if (item.type == 'document') tmp_items.push(item);
					break;

				case 'archive':
					if (item.type == 'archive') tmp_items.push(item);
					break;

				default:
				case 'all':
					tmp_items.push(item);
					break;
			}
		});

		if (selected) {
			if (single) {
				tmp_items.map((item) => {
					if (item.file_name == selected) tmp_selected.push(item.file_name);
				});
			} else {
				if (Array.isArray(selected)) {
					if (selected.length > 0)
						tmp_items.map((item) => {
							selected.map((sel) => {
								if (item.file_name == sel || item.id == sel)
									tmp_selected.push(item.file_name);
							});
						});
				}
			}
		}

		setItems(tmp_items);
		setItemsSelected(tmp_selected);
		setTmpItemsSelected(tmp_selected);
	};

	useEffect(() => {
		if (Uploads) setInitialItems();
	}, [Uploads]);

	const onSelectHandler = (fileName) => {
		let tmp_selected = [...tmpItemsSelected];

		if (tmp_selected.indexOf(fileName) > -1) {
			tmp_selected.splice(tmp_selected.indexOf(fileName), 1);
		} else {
			if (single) tmp_selected = [];
			tmp_selected.push(fileName);
		}

		setTmpItemsSelected(tmp_selected);
	};

	const onConfirmHandler = () => {
		console.log('!!!', tmpItemsSelected);

		if (onChange) {
			if (single) {
				onChange(tmpItemsSelected[0] || '');
			} else {
				onChange(tmpItemsSelected);
			}
		}
		setItemsSelected(tmpItemsSelected);
		setDialogOpen(false);
	};

	const isItemSelected = (fileName) => tmpItemsSelected.includes(fileName);

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={toggleDialog} size={'lg'}>
				<Modal.Header>Menu items manager</Modal.Header>
				<Modal.Content>
					<DialogStructureWrapper>
						<DialogList>
							{items.map((item) => (
								<DialogListItem
									key={item.id}
									type="button"
									onClick={() => onSelectHandler(item.file_name)}
									selected={isItemSelected(item.file_name)}
								>
									{item.type == 'image' ? (
										<>
											<img
												src={
													config.UPLOADS_PATH.image.thumbnail + item.file_name
												}
												alt={item.name}
												className="img"
											/>
										</>
									) : (
										<>
											<span className={`span span-${item.type}`}>
												{item.name}
											</span>
										</>
									)}
								</DialogListItem>
							))}
						</DialogList>
					</DialogStructureWrapper>
				</Modal.Content>
				<Modal.Footer>
					<BaseButton onClick={toggleDialog}>Close</BaseButton>
					<BaseButton type="primary" onClick={onConfirmHandler}>
						Confirm
					</BaseButton>
				</Modal.Footer>
			</Modal.Base>
			<Wrapper>
				<BaseButton onClick={toggleDialog} type="primary" ghost>
					Manager
				</BaseButton>
				{itemsSelected.length > 0 ? (
					<>
						<SelectedStructureContainer>
							<SelectedList>
								{itemsSelected.map((item) => (
									<SelectedListItem key={item}>
										{type == 'image' ? (
											<img
												src={config.UPLOADS_PATH.image.thumbnail + item}
												alt={item}
												className="img"
											/>
										) : (
											<span className="span">{item}</span>
										)}
									</SelectedListItem>
								))}
							</SelectedList>
						</SelectedStructureContainer>
					</>
				) : (
					<div>...</div>
				)}
			</Wrapper>
		</>
	);
};

export default UploadsManager;
