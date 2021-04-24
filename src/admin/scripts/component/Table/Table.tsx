import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { array } from 'javascript-es6-helpers';
import { useForm, Controller } from 'react-hook-form';
import {
	Table as AntdTable,
	Tag,
	Input,
	Radio,
	Form,
	Space,
	message,
} from 'antd';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

import { Button } from '../ui';
import DetailItem from '../Detail';
import Confirm from '../Confirm';
import { commonModelProps } from '../../types';
import { appProps, routeProps } from '../../types';

const Heading = styled.div`
	width: 100%;
	height: auto;
	padding-bottom: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const StyledSearch = styled(Input)`
	width: 250px;
`;

const remodelItems = (input: any[]) => {
	let na = [];

	input.map((item) => {
		item.key = item.id;
		na.push(item);
	});

	return na;
};

interface ListItemProps extends commonModelProps {
	name?: string;
	title?: string;
}

interface ListItemsProps {
	model: appProps['model'];
	items: ListItemProps[];
	route: routeProps;
	columnsLayout?: {
		name?: boolean;
		email?: boolean;
		nickname?: boolean;
		title?: boolean;
		tags?: boolean;
		category?: boolean;
		active?: boolean;
	};
	orderByColumns?: {
		name?: boolean;
		email?: boolean;
	};
	selectable?: boolean;
	searchAttrs?: string[];
	allowDelete?: boolean;
	loading?: boolean;
	detailId?: string;
	onToggle: (data: any) => void;
	onDelete: (data: any) => void;
}

const Table: React.FC<ListItemsProps> = (props) => {
	const history = useHistory();
	const location = useLocation();
	const {
		model,
		items = [],
		columnsLayout = {
			name: false,
			email: false,
			nickname: false,
			tags: false,
			category: false,
			active: false,
		},
		orderByColumns = {
			name: false,
			email: false,
		},
		route,
		selectable,
		searchAttrs = [],
		onToggle,
		onDelete,
		allowDelete,
		detailId,
	} = props;
	const { control, handleSubmit } = useForm({
		mode: 'onChange',
		defaultValues: {
			search: '',
			orderBy: 'id',
			order: 'asc',
		},
	});
	const [listItems, setListItems] = useState<any[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
	const [loading, setLoading] = useState(props.loading);
	const [detailOpen, setDetailOpen] = useState(false);
	const [detailData, setDetailData] = useState<any>(null);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [confirmData, setConfirmData] = useState<any>(null);

	// Set and remodel items to list
	useEffect(() => {
		if (items && items.length > 0) {
			setListItems(remodelItems(items));
		}
	}, [items]);

	// Check url for detail url
	useEffect(() => {
		if (items && items.length > 0 && detailId) {
			items.map((item) => {
				if (item.id == detailId) {
					editOpen(item);
				}
			});
		}
	}, [items, detailId]);

	// Create default object for new item (whatever)
	useEffect(() => {
		if (location.pathname.includes('/new')) {
			editOpen({
				is_new: true, // IMPORTANT
				id: 'new', // IMPORTANT
			});
		}
	}, [location.pathname]);

	const toggleDetail = () => setDetailOpen(!detailOpen);
	const toggleConfirm = () => setConfirmOpen(!confirmOpen);
	const getColumns = () => {
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
		if (columnsLayout.email)
			d.push({
				title: 'E-mail',
				dataIndex: 'email',
				key: 'email',
				render: (text, record) => (
					<a onClick={() => editOpen(record)}>{text}</a>
				),
			});
		if (columnsLayout.title)
			d.push({
				title: 'Title',
				dataIndex: 'title',
				key: 'title',
				render: (text, record) => (
					<a onClick={() => editOpen(record)}>{record.lang.en.title}</a>
				),
			});
		if (columnsLayout.nickname)
			d.push({
				title: 'Nickname',
				dataIndex: 'nickname',
				key: 'nickname',
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
		if (columnsLayout.active)
			d.push({
				title: 'Active',
				dataIndex: 'active',
				key: 'active',
				align: 'end',
				width: '100px',
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
						onClick={() => toggleHandler(record)}
						title={'Toggle'}
					>
						Toggle
					</Button.Base>
					{allowDelete && (
						<Button.Base
							type="link"
							onClick={() => deleteConfirm(record)}
							style={{ marginLeft: '-1px' }}
							title={'Delete'}
							danger
						>
							Delete
						</Button.Base>
					)}
				</>
			),
		});

		return d;
	};
	const getOrderColumns = () => {
		let d = [{ label: 'Id', value: 'id' }];

		if (orderByColumns.name) d.push({ label: 'Name', value: 'name' });
		if (orderByColumns.email) d.push({ label: 'E-mail', value: 'email' });

		return d;
	};
	const selectChangeHandler = (keys) => {
		let na = [...keys];
		setSelectedKeys(na);
	};
	const deleteConfirm = (record: any) => {
		setConfirmData(record);
		setConfirmOpen(true);
	};
	const editOpen = (record: any) => {
		history.push(`${route.pathDetail}/${record.id}`);
		setDetailData(record);
		setDetailOpen(true);
	};
	const toggleSelected = (keys: any) => {
		onToggle(keys);
		setSelectedKeys([]); // TODO: reset selected for antd table !!!
	};
	const toggleHandler = (data: any) => onToggle(data);
	const deleteHandler = (data: any) => {
		onDelete(data);
		setSelectedKeys([]); // TODO: reset selected for antd table !!!
	};
	const detailHandler = (data: any, response?: any) => {
		if (data.is_new) {
			let newId = response?.data?.id;
			if (newId) {
				message.success(`#${newId} was created successfully`, 2.5);
			} else {
				message.success('Created successfully', 2.5);
			}
		} else {
			message.success(`Updated successfully`, 2.5);
		}
	};
	const closeDetail = () => {
		history.push(route.path);
	};
	const updateListItems = (data) => {
		let tmp;

		if (data.search.length >= 4) {
			tmp = array.search(listItems, [...searchAttrs], data.search);
		} else {
			tmp = items;
		}

		setListItems(remodelItems(_.orderBy(tmp, [data.orderBy], [data.order])));
	};

	return (
		<>
			<Heading>
				<div>
					<Form
						onChange={handleSubmit((data) => updateListItems(data))}
						layout={'inline'}
					>
						<Space>
							<Controller
								control={control}
								name={'search'}
								render={({ onChange, value, name, ref }) => (
									<StyledSearch
										type="search"
										name={name}
										placeholder="Search in list"
										onChange={onChange}
										prefix={<MdSearch />}
										value={value}
										allowClear
									/>
								)}
							/>
							<Form.Item label={'Order by'}>
								<Controller
									control={control}
									name={'orderBy'}
									render={({ onChange, value, name }) => (
										<Radio.Group
											name={name}
											options={getOrderColumns()}
											onChange={(e) => onChange(e.target.value)}
											value={value}
											optionType="button"
										/>
									)}
								/>
							</Form.Item>
							<Form.Item label={'Order'}>
								<Controller
									control={control}
									name={'order'}
									render={({ onChange, value, name }) => (
										<Radio.Group
											name={name}
											options={[
												{ label: 'Asc', value: 'asc' },
												{ label: 'Desc', value: 'desc' },
											]}
											onChange={(e) => onChange(e.target.value)}
											value={value}
											optionType="button"
										/>
									)}
								/>
							</Form.Item>
						</Space>
					</Form>
				</div>
				<div>
					<Space>
						{selectable && allowDelete && (
							<>
								<Button.Base
									disabled={selectedKeys.length === 0}
									onClick={() => toggleSelected(selectedKeys)}
								>
									Toggle ({selectedKeys.length})
								</Button.Base>
								<Button.Base
									disabled={selectedKeys.length === 0}
									onClick={() => deleteConfirm(selectedKeys)}
								>
									Delete ({selectedKeys.length})
								</Button.Base>
							</>
						)}
					</Space>
				</div>
			</Heading>
			<AntdTable
				columns={getColumns()}
				dataSource={listItems}
				rowSelection={
					selectable && {
						onChange: selectChangeHandler,
					}
				}
				// onChange={selectChangeHandler}
				loading={loading}
				sticky
			/>
			<DetailItem.Dialog
				model={model}
				isOpen={detailOpen}
				onCancel={toggleDetail}
				detailData={detailData}
				onSave={detailHandler}
				onDelete={deleteConfirm}
				afterClose={closeDetail}
			/>
			<Confirm.Dialog
				isOpen={confirmOpen}
				onCancel={toggleConfirm}
				confirmData={confirmData}
				onConfirm={deleteHandler}
			/>
		</>
	);
};

export default Table;
