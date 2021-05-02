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
import { useTranslation } from 'react-i18next';

// import IconShow from '../../../../libs/svg/material-icons/visibility_black_24dp.svg';
import { MESSAGE_SUCCESS_DURATION } from '../../constants';
import { Button } from '../ui';
import DetailItem from '../Detail';
import Confirm from '../Confirm';
import { commonModelProps } from '../../types';
import { appProps, routeProps } from '../../types';
import { useProfile } from '../../App/hooks';

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
const RowIconBlock = styled.span`
	& svg {
		max-width: 1.25rem;
	}
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
		level?: boolean;
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
		loading,
	} = props;
	const { t } = useTranslation(['common', 'message', 'component']);
	const { Profile } = useProfile();
	const { control, handleSubmit } = useForm({
		mode: 'onChange',
		defaultValues: {
			search: '',
			orderBy: 'id',
			order: 'asc',
		},
	});
	const [listItems, setListItems] = useState<any[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
	const [detailOpen, setDetailOpen] = useState<boolean>(false);
	const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
	const [detailData, setDetailData] = useState<any>(null);
	const [confirmData, setConfirmData] = useState<any>(null);

	useEffect(() => {
		if (items && items.length > 0) {
			setListItems(remodelItems(items));
		}
	}, [items]);

	useEffect(() => {
		if (items && items.length > 0 && detailId) {
			items.map((item) => {
				if (item.id == detailId) {
					editOpen(item);
				}
			});
		}
	}, [items, detailId]);

	useEffect(() => {
		if (location.pathname.includes('/new')) {
			editOpen({
				// Necessary props
				is_new: true,
				id: 'new',
			});
		}
	}, [location.pathname]);

	const toggleDetail = () => setDetailOpen(!detailOpen);
	const toggleConfirm = () => setConfirmOpen(!confirmOpen);
	const getColumns = () => {
		let d = [];

		if (columnsLayout.name)
			d.push({
				title: t('component:Table.column_label.name'),
				dataIndex: 'name',
				key: 'name',
				render: (text, record) => (
					<a onClick={() => editOpen(record)}>{text}</a>
				),
			});
		if (columnsLayout.email)
			d.push({
				title: t('component:Table.column_label.email'),
				dataIndex: 'email',
				key: 'email',
				render: (text, record) => (
					<a onClick={() => editOpen(record)}>{text}</a>
				),
			});
		if (columnsLayout.title)
			d.push({
				title: t('component:Table.column_label.title'),
				dataIndex: 'title',
				key: 'title',
				render: (text, record) => (
					<a onClick={() => editOpen(record)}>{record.lang.en.title}</a>
				),
			});
		if (columnsLayout.nickname)
			d.push({
				title: t('component:Table.column_label.nickname'),
				dataIndex: 'nickname',
				key: 'nickname',
			});
		if (columnsLayout.level)
			d.push({
				title: t('component:Table.column_label.level'),
				dataIndex: 'user_level',
				key: 'user_level',
				render: (text) => (
					<RowIconBlock>
						{
							{
								0: (
									<svg height="24px" viewBox="0 0 24 24" width="24px">
										<path d="M0 0h24v24H0z" fill="none" />
										<path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
									</svg>
								),
								2: (
									<svg height="24px" viewBox="0 0 24 24" width="24px">
										<path d="M0 0h24v24H0z" fill="none" />
										<path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
									</svg>
								),
								3: (
									<svg height="24px" viewBox="0 0 24 24" width="24px">
										<path d="M0 0h24v24H0z" fill="none" />
										<path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z" />
									</svg>
								),
								5: (
									<svg height="24px" viewBox="0 0 24 24" width="24px">
										<path d="M0 0h24v24H0z" fill="none" />
										<path d="M11.99 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm3.61 6.34c1.07 0 1.93.86 1.93 1.93 0 1.07-.86 1.93-1.93 1.93-1.07 0-1.93-.86-1.93-1.93-.01-1.07.86-1.93 1.93-1.93zm-6-1.58c1.3 0 2.36 1.06 2.36 2.36 0 1.3-1.06 2.36-2.36 2.36s-2.36-1.06-2.36-2.36c0-1.31 1.05-2.36 2.36-2.36zm0 9.13v3.75c-2.4-.75-4.3-2.6-5.14-4.96 1.05-1.12 3.67-1.69 5.14-1.69.53 0 1.2.08 1.9.22-1.64.87-1.9 2.02-1.9 2.68zM11.99 20c-.27 0-.53-.01-.79-.04v-4.07c0-1.42 2.94-2.13 4.4-2.13 1.07 0 2.92.39 3.84 1.15-1.17 2.97-4.06 5.09-7.45 5.09z" />
									</svg>
								),
								7: (
									<svg height="24px" viewBox="0 0 24 24" width="24px">
										<path d="M0 0h24v24H0z" fill="none" />
										<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
									</svg>
								),
							}[text]
						}
					</RowIconBlock>
				),
			});
		if (columnsLayout.tags)
			d.push({
				title: t('component:Table.column_label.tags'),
				key: 'tags',
				dataIndex: 'tags',
				render: (tags) => (
					<>
						{tags.map((tag) => (
							<Tag key={tag}>#{tag}</Tag>
						))}
					</>
				),
			});
		if (columnsLayout.category)
			d.push({
				title: t('component:Table.column_label.category'),
				key: 'category',
				dataIndex: 'category',
				render: (category) => (
					<>
						{category.map((ctg) => (
							<Tag key={ctg}>{ctg}</Tag>
						))}
					</>
				),
			});
		if (columnsLayout.active)
			d.push({
				title: t('component:Table.column_label.active'),
				dataIndex: 'active',
				key: 'active',
				align: 'end',
				width: '100px',
				render: (text) => (
					<RowIconBlock>
						{text == 1 ? (
							<svg height="24px" viewBox="0 0 24 24" width="24px">
								<path d="M0 0h24v24H0z" fill="none" />
								<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
							</svg>
						) : (
							<svg height="24px" viewBox="0 0 24 24" width="24px">
								<path
									d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
									fill="none"
								/>
								<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
							</svg>
						)}
					</RowIconBlock>
				),
			});

		if (Profile.user_level > 0)
			d.push({
				title: t('component:Table.column_label.action'),
				key: 'action',
				align: 'end',
				render: (text, record) => (
					<>
						<Button.Base
							type="link"
							onClick={() => editOpen(record)}
							title={t('component:Table.row_action.edit')}
						>
							{t('component:Table.row_action.edit')}
						</Button.Base>
						<Button.Base
							type="link"
							onClick={() => toggleHandler(record)}
							title={t('component:Table.row_action.toggle')}
						>
							{t('component:Table.row_action.toggle')}
						</Button.Base>
						{allowDelete && (
							<Button.Base
								type="link"
								onClick={() => deleteConfirm(record)}
								style={{ marginLeft: '-1px' }}
								title={t('component:Table.row_action.delete')}
								danger
							>
								{t('component:Table.row_action.delete')}
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
		setSelectedRowKeys([]);

		message.success(
			t('message:success.items.update', { count: keys.length }),
			MESSAGE_SUCCESS_DURATION,
		);
	};
	const toggleHandler = (data: any) => {
		onToggle(data);

		message.success(
			t('message:success.items.update'),
			MESSAGE_SUCCESS_DURATION,
		);
	};
	const deleteHandler = (data: any) => {
		let msg = t('message:success.items.delete');
		if (!data.id)
			msg = t('message:success.items.delete', { count: data.length });
		onDelete(data);
		setSelectedRowKeys([]);
		setConfirmOpen(false);
		setDetailOpen(false);
		closeDetail();

		message.success(msg, MESSAGE_SUCCESS_DURATION);
	};
	const detailHandler = (data: any, response?: any) => {
		let msg = t('message:success.items.update');
		if (data.id == 'new') {
			let newId = response?.data?.id;
			if (newId) msg = t('message:success.items.createId', { id: newId });
		}

		message.success(msg, MESSAGE_SUCCESS_DURATION);
	};
	const closeDetail = () => {
		history.push(route.path);
	};
	const setList = (data) => {
		let tmp;

		if (data.search.length >= 4) {
			tmp = array.search(listItems, [...searchAttrs], data.search);
		} else {
			tmp = items;
		}

		setListItems(remodelItems(_.orderBy(tmp, [data.orderBy], [data.order])));
	};

	const rowSelection = {
		selectedRowKeys: selectedRowKeys,
		onSelectAll: (selected, selectedRows, changeRows) => {
			if (selectedRowKeys.length !== 0) {
				setSelectedRowKeys([]);
			}
		},
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRowKeys(selectedRowKeys);
		},
	};

	return (
		<>
			<Heading>
				<div>
					<Form
						onChange={handleSubmit((data) => setList(data))}
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
										placeholder={t('component:Table.search_placeholder')}
										onChange={onChange}
										prefix={<MdSearch />}
										value={value}
										allowClear
									/>
								)}
							/>
							<Form.Item label={t('component:Table.orderBy_label')}>
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
							<Form.Item label={t('component:Table.order_label')}>
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
									disabled={selectedRowKeys.length === 0}
									onClick={() => toggleSelected(selectedRowKeys)}
								>
									{t('btn.toggle')} ({selectedRowKeys.length})
								</Button.Base>
								<Button.Base
									disabled={selectedRowKeys.length === 0}
									onClick={() => deleteConfirm(selectedRowKeys)}
								>
									{t('btn.delete')} ({selectedRowKeys.length})
								</Button.Base>
							</>
						)}
					</Space>
				</div>
			</Heading>
			<AntdTable
				columns={getColumns()}
				dataSource={listItems}
				rowSelection={selectable && rowSelection}
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
