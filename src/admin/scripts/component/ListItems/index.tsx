import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Tag } from 'antd';
import styled from 'styled-components';

import { Button } from '../ui';
import DetailItemDialog from '../DetailItemDialog';
import ConfirmDialog from '../ConfirmDialog';

const Heading = styled.div`
	width: 100%;
	height: auto;
	padding-bottom: 0.5rem;
`;

const remodelItems = (input: any[]) => {
	let na = [];

	input.map((item) => {
		item.key = item.id;
		na.push(item);
	});

	return na;
};

interface ListItemsProps {
	model: 'Posts' | 'Users'; // TODO
	items: any[];
	route: any; // TODO
	onReload: () => void;
	columnsLayout?: {
		name?: boolean;
		// title?: string; // TODO
		tags?: boolean;
		category?: boolean;
	};
	loading?: boolean;
	detailId?: string;
}

const ListItems: React.FC<ListItemsProps> = (props) => {
	const history = useHistory();
	const {
		model,
		items,
		columnsLayout = {
			name: false,
			tags: false,
			category: false,
		},
		route,
		detailId,
		onReload,
	} = props;
	const [listItems, setListItems] = useState<any[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
	const [loading, setLoading] = useState(props.loading);
	const [detailOpen, setDetailOpen] = useState(false);
	const [detailData, setDetailData] = useState<any>(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [confirmData, setConfirmData] = useState<any>(null);

	// Set and remodel items to list
	useEffect(() => {
		if (items.length > 0) {
			setListItems(remodelItems(items));
		}
	}, [items]);

	// Check url for detail url
	useEffect(() => {
		if (items.length > 0 && detailId) {
			items.map((item) => {
				if (item.id == detailId) {
					editOpen(item);
				}
			});
		}
	}, [items, detailId]);

	const toggleDetail = () => setDetailOpen(!detailOpen);
	const toggleConfirm = () => setConfirmOpen(!confirmOpen);
	const getColumnsLayout = () => {
		let d = [];

		if (columnsLayout.name)
			d.push({
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				render: (text, record) => (
					<a onClick={() => editOpen(record)}>{text}</a>
				),
			});
		if (columnsLayout.tags)
			d.push({
				title: 'Tags',
				key: 'tags',
				dataIndex: 'tags',
				render: (tags) => (
					<>
						{tags.map((tag) => (
							<Tag key={tag}>{tag.toUpperCase()}</Tag>
						))}
					</>
				),
			});
		if (columnsLayout.category)
			d.push({
				title: 'Category',
				key: 'category',
				dataIndex: 'category',
				render: (category) => (
					<>
						{category.map((ctg) => (
							<Tag key={ctg}>{ctg.toUpperCase()}</Tag>
						))}
					</>
				),
			});

		d.push({
			title: 'Action',
			key: 'action',
			align: 'end',
			render: (text, record) => (
				<>
					<Button.Base
						type="link"
						onClick={() => editOpen(record)}
						title={'Edit'}
					>
						Edit
					</Button.Base>
					<Button.Base
						type="link"
						onClick={() => deleteConfirm(record)}
						style={{ marginLeft: '-1px' }}
						title={'Delete'}
						danger
					>
						Delete
					</Button.Base>
				</>
			),
		});

		return d;
	};
	const selectChangeHandler = (keys) => {
		let na = [...keys];
		setSelectedKeys(na);
	};
	const deleteConfirm = (record: any) => {
		// console.log('deleteOpen', record);
		setConfirmData(record);
		setConfirmOpen(true);
	};
	const editOpen = (record: any) => {
		// console.log('editOpen', record);
		history.push(`${route.pathDetail}/${record.id}`);
		setDetailData(record);
		setDetailOpen(true);
	};
	const deleteHandler = (data: any) => {
		console.log('deleteHandler', data);
		// TODO: deselect items in list ...
		// setSelectedKeys([]);
	};
	const editHandler = (data: any) => {
		console.log('editHandler', data);
	};
	const onDetailClose = () => {
		history.push(route.path);
	};

	return (
		<>
			<Heading>
				<div>
					<Button.Base onClick={onReload} loading={loading}>
						Reload
					</Button.Base>
					<Button.Base
						disabled={selectedKeys.length === 0}
						onClick={() => deleteConfirm(selectedKeys)}
					>
						Delete selected ({selectedKeys.length})
					</Button.Base>
				</div>
			</Heading>
			<Table
				columns={getColumnsLayout()}
				dataSource={listItems}
				rowSelection={{
					onChange: selectChangeHandler,
				}}
				onChange={selectChangeHandler}
				loading={loading}
				sticky
			/>
			<DetailItemDialog
				isOpen={detailOpen}
				onCancel={toggleDetail}
				detailData={detailData}
				onSave={editHandler}
				onDelete={(data) => deleteConfirm(data)}
				afterClose={onDetailClose}
			/>
			<ConfirmDialog
				isOpen={confirmOpen}
				onCancel={toggleConfirm}
				confirmData={confirmData}
				onConfirm={deleteHandler}
				confirmText={'Delete please'}
			/>
		</>
	);
};

export default ListItems;
