import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { Table as AntdTable, Input, Radio, Form, message, Tag } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { array, file } from '../../../../libs/js/utils';
import {
	MESSAGE_SUCCESS_DURATION,
	TABLE_ITEMS_PER_PAGE,
	BREAKPOINTS,
	ROUTE_PATH_SUFFIX_DETAIL,
} from '../../constants';
import { Button, Viewer, Icon } from '../ui';
import LanguageToggle from '../Language';
import DetailItem from '../Detail';
import Confirm from '../Confirm';
import { commonModelProps } from '../../types';
import { appProps, routeProps } from '../../types';
import { useProfile } from '../../App/hooks';
import TableDrawer from './TableDrawer';

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
const RowLink = styled.a`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	opacity: ${(props) => (props.notActive ? '.55' : '1')};

	& > div {
		display: flex;
		flex-direction: column;
	}
`;
const RowLinkImage = styled.img`
	max-width: 40px;
	height: auto;
	margin-right: 1rem;
`;
const RowLinkAvatar = styled(RowLinkImage)`
	border-radius: 50px;
`;
const RowFileIconWrapper = styled.div`
	margin-right: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const StyledTable = styled.table`
	width: 100%;
	min-width: ${BREAKPOINTS.md}px;
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
	model:
		| appProps['modelApp']
		| appProps['modelMembers']
		| appProps['modelMarket'];
	items: ListItemProps[];
	route: routeProps;
	columnsLayout?: {
		name?: boolean;
		email?: boolean;
		nickname?: boolean;
		level?: boolean;
		title?: boolean;
		title_lang?: boolean;
		tags?: boolean;
		category?: boolean;
		active?: boolean;
		sender?: boolean;
		file_name?: boolean;
		type?: boolean;
		user_group?: boolean;
		member_group?: boolean;
		file_size?: boolean;
		t_value?: boolean;
		context?: boolean;
		r_value?: boolean;
		authorized?: boolean;
		// TODO: new columns
	};
	orderByColumns?: {
		name?: boolean;
		email?: boolean;
		sender?: boolean;
		file_name?: boolean;
		// TODO: new columns
	};
	actionColumn?: {
		edit?: boolean;
		toggle?: boolean;
		delete?: boolean;
	};
	selectable?: boolean;
	searchAttrs?: string[];
	allowDelete?: boolean;
	loading?: boolean;
	detailId?: string;
	onToggle?: (data: any) => void;
	onDelete: (data: any) => void;
	withLanguageToggle?: boolean;
	itemsPerPage?: number;
	redactorId?: number;
}

const Table: React.FC<ListItemsProps> = (props) => {
	const { t } = useTranslation(['common', 'message', 'component', 'types']);
	const history = useHistory();
	const location = useLocation();
	const {
		model,
		items = [],
		columnsLayout = {
			// TODO: new columns
		},
		orderByColumns = {
			// TODO: new columns
		},
		actionColumn,
		route,
		selectable,
		searchAttrs = [],
		onToggle,
		onDelete,
		allowDelete,
		detailId,
		loading,
		withLanguageToggle,
		itemsPerPage = TABLE_ITEMS_PER_PAGE,
		redactorId,
	} = props;
	const { Profile } = useProfile();
	const { control, handleSubmit } = useForm({
		mode: 'all',
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
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const actions = {
		edit: true,
		toggle: true,
		delete: true,
		...actionColumn,
	};

	const editOptions = Profile?.user_level > 0;

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

		// TODO: new columns

		if (columnsLayout.name)
			d.push({
				title: t('component:Table.column_label.name'),
				dataIndex: 'name',
				key: 'name',
				render: (text, record) => (
					<RowLink
						onClick={() => editOpen(record)}
						notActive={record.active !== 1}
					>
						{record.img_thumbnail && (
							<RowLinkImage
								src={config.UPLOADS_PATH.image.thumbnail + record.img_thumbnail}
								alt={record.name}
							/>
						)}
						{text}
					</RowLink>
				),
			});
		if (columnsLayout.t_value)
			d.push({
				title: t('component:Table.column_label.value'),
				dataIndex: 't_value',
				key: 't_value',
				render: (text, record) => (
					<RowLink
						onClick={() => editOpen(record)}
						notActive={record.active !== 1}
					>
						{record.lang[lang].t_value}
					</RowLink>
				),
			});
		if (columnsLayout.r_value)
			d.push({
				title: t('component:Table.column_label.value'),
				dataIndex: 'value',
				key: 'value',
				render: (text, record) => (
					<RowLink
						onClick={() => editOpen(record)}
						notActive={record.status !== 0}
					>
						{record.value}
					</RowLink>
				),
			});
		if (columnsLayout.sender)
			d.push({
				title: t('component:Table.column_label.sender'),
				dataIndex: 'sender',
				key: 'sender',
				render: (text, record) => (
					<RowLink
						onClick={() => editOpen(record)}
						notActive={record.status !== 1}
					>
						{text}
					</RowLink>
				),
			});
		if (columnsLayout.file_name)
			d.push({
				title: t('component:Table.column_label.fileName'),
				dataIndex: 'file_name',
				key: 'file_name',
				render: (text, record) => (
					<RowLink
						onClick={() => editOpen(record)}
						notActive={record.active !== 1}
					>
						{record.type == 'image' ? (
							<RowLinkImage
								src={config.UPLOADS_PATH.image.thumbnail + text}
								alt={record.name}
							/>
						) : (
							<RowFileIconWrapper>
								<Icon.FileType type={record.type} size={20} />
							</RowFileIconWrapper>
						)}
						{text}
					</RowLink>
				),
			});
		if (columnsLayout.email)
			d.push({
				title: t('component:Table.column_label.email'),
				dataIndex: 'email',
				key: 'email',
				render: (text, record) => (
					<RowLink
						onClick={() => editOpen(record)}
						notActive={record.active !== 1}
					>
						{record.img_avatar && (
							<RowLinkAvatar src={record.img_avatar} alt={record.email} />
						)}
						{text}
					</RowLink>
				),
			});
		if (columnsLayout.title)
			d.push({
				title: t('component:Table.column_label.title'),
				dataIndex: 'title',
				key: 'title',
				render: (text, record) => (
					<RowLink
						onClick={() => editOpen(record)}
						notActive={record.active !== 1}
					>
						{record.img_thumbnail && (
							<RowLinkImage
								src={config.UPLOADS_PATH.image.thumbnail + record.img_thumbnail}
								alt={record.title}
							/>
						)}
						{text}
					</RowLink>
				),
			});
		if (columnsLayout.title_lang)
			d.push({
				title: t('component:Table.column_label.title'),
				dataIndex: 'title',
				key: 'title',
				render: (text, record) => (
					<RowLink
						onClick={() => editOpen(record)}
						notActive={record.active !== 1}
					>
						{record.img_thumbnail && (
							<RowLinkImage
								src={config.UPLOADS_PATH.image.thumbnail + record.img_thumbnail}
								alt={record.lang[lang].title}
							/>
						)}
						<div>
							{record.lang[lang].title}
							{record.name && <small>{record.name}</small>}
						</div>
					</RowLink>
				),
			});
		if (columnsLayout.nickname)
			d.push({
				title: t('component:Table.column_label.nickname'),
				dataIndex: 'nickname',
				key: 'nickname',
				render: (text) => <b>{text}</b>,
			});
		if (columnsLayout.level)
			d.push({
				title: t('component:Table.column_label.level'),
				dataIndex: 'user_level',
				key: 'user_level',
				render: (text) => <Icon.UserLevel level={text} size={15} withLabel />,
			});
		if (columnsLayout.type)
			d.push({
				title: t('component:Table.column_label.type'),
				dataIndex: 'type',
				key: 'type',
				render: (text) => <Tag>{t(`types:${text}`)}</Tag>,
			});
		if (columnsLayout.file_size)
			d.push({
				title: t('component:Table.column_label.size'),
				dataIndex: 'file_size',
				key: 'file_size',
				render: (text) => <span>{file.formatBytes(text)}</span>,
			});
		if (columnsLayout.context)
			d.push({
				title: t('component:Table.column_label.context'),
				dataIndex: 'context',
				key: 'context',
				render: (text) => <Tag>{text}</Tag>,
			});
		if (columnsLayout.authorized)
			d.push({
				title: t('component:Table.column_label.authorized'),
				dataIndex: 'authorized',
				key: 'authorized',
				render: (text) => (
					<>{text == 1 && <Icon.Material type="Check" size={15} />}</>
				),
			});
		if (columnsLayout.user_group)
			d.push({
				title: t('component:Table.column_label.group'),
				dataIndex: 'user_group',
				key: 'user_group',
				render: (text) => <Tag>{t(`types:${text}`)}</Tag>,
			});
		if (columnsLayout.member_group)
			d.push({
				title: t('component:Table.column_label.group'),
				dataIndex: 'member_group',
				key: 'member_group',
				render: (text) => <Tag>{t(`types:${text}`)}</Tag>,
			});
		if (columnsLayout.tags)
			d.push({
				title: t('component:Table.column_label.tags'),
				key: 'tags',
				dataIndex: 'tags',
				render: (tags) => <Viewer model="Tags" items={tags} />,
			});
		if (columnsLayout.category)
			d.push({
				title: t('component:Table.column_label.category'),
				key: 'category',
				dataIndex: 'category',
				render: (category) => (
					<Viewer model="Categories" items={category} language={lang} />
				),
			});

		if (editOptions)
			d.push({
				title: t('component:Table.column_label.action'),
				key: 'action',
				align: 'end',
				render: (text, record) => (
					<>
						<Button.Edit
							onClick={() => editOpen(record)}
							title={t('component:Table.row_action.edit')}
						/>
						<Button.Toggle
							onClick={() => toggleHandler(record)}
							title={t('component:Table.row_action.toggle')}
							isToggled={record.active == 1}
							isHidden={!actions.toggle}
						/>
						<Button.Delete
							onClick={() => deleteConfirm(record)}
							style={{ marginLeft: '-1px' }}
							title={t('component:Table.row_action.delete')}
							isHidden={!(actions.delete && allowDelete)}
						/>
					</>
				),
			});

		return d;
	};
	const getOrderColumns = () => {
		let d = [{ label: 'Id', value: 'id' }];

		// TODO: new columns

		if (orderByColumns.name) d.push({ label: 'Name', value: 'name' });
		if (orderByColumns.email) d.push({ label: 'E-mail', value: 'email' });

		return d;
	};
	const deleteConfirm = (record: any) => {
		setConfirmData(record);
		setConfirmOpen(true);
	};
	const editOpen = (record: any) => {
		history.push(`${route.path}${ROUTE_PATH_SUFFIX_DETAIL}/${record.id}`);
		setDetailData(record);
		setDetailOpen(true);
	};
	const toggleSelected = (keys: any) => {
		if (onToggle) onToggle(keys);
		setSelectedRowKeys([]);

		message.success(
			t('message:success.items.update', { count: keys.length }),
			MESSAGE_SUCCESS_DURATION,
		);
	};
	const toggleHandler = (data: any) => {
		if (onToggle) onToggle(data);

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

		const getSearchAttrs = (attrs) => {
			let na = [];

			attrs.map((attr) => {
				let ni = attr.replace('[lang]', lang);
				na.push(ni);
			});

			return na;
		};

		if (data.search.length >= 4) {
			tmp = array.search(listItems, getSearchAttrs(searchAttrs), data.search);
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
					{selectable && allowDelete && (
						<>
							{actions.toggle && (
								<Button.Base
									disabled={selectedRowKeys.length === 0}
									onClick={() => toggleSelected(selectedRowKeys)}
								>
									{t('btn.toggle')} ({selectedRowKeys.length})
								</Button.Base>
							)}
							<Button.Base
								disabled={selectedRowKeys.length === 0}
								onClick={() => deleteConfirm(selectedRowKeys)}
							>
								{t('btn.delete')} ({selectedRowKeys.length})
							</Button.Base>
						</>
					)}
				</div>
				<div>
					<TableDrawer>
						<div>
							<Form onChange={handleSubmit((data) => setList(data))}>
								<Form.Item label="Search">
									<Controller
										control={control}
										name={'search'}
										render={({ onChange, value, name, ref }) => (
											<StyledSearch
												type="search"
												name={name}
												placeholder={t('component:Table.search_placeholder')}
												onChange={onChange}
												prefix={<Icon.Material type="Search" size={20} />}
												value={value}
												allowClear
											/>
										)}
									/>
								</Form.Item>
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
							</Form>
							<div>
								{withLanguageToggle && (
									<LanguageToggle onChange={(lang) => setLang(lang)} />
								)}
							</div>
						</div>
					</TableDrawer>
				</div>
			</Heading>
			<AntdTable
				columns={getColumns()}
				dataSource={listItems}
				rowSelection={selectable && rowSelection}
				loading={loading}
				pagination={{
					defaultPageSize: itemsPerPage,
					position: ['bottomCenter'],
				}}
				tableLayout="fixed"
				components={{
					table: StyledTable,
				}}
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
				allowSave={actions.edit}
				allowDelete={actions.delete && allowDelete}
				redactorId={redactorId}
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
