import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
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

import { array } from '../../../../libs/js/utils';
import {
	IconMaterial_Face,
	IconMaterial_PermIdentity,
	IconMaterial_SupervisorAccount,
	IconMaterial_SupervisedUserCircle,
	IconMaterial_VerifiedUser,
} from '../../../../libs/svg/material-icons';
import CFG from '../../../../config/global.json';
import { MESSAGE_SUCCESS_DURATION } from '../../constants';
import { Button, Viewer } from '../ui';
import LanguageToggle from '../LanguageToggle';
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
const RowLink = styled.a`
	opacity: ${(props) => (props.notActive ? '.55' : '1')};
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
		title_lang?: boolean;
		tags?: boolean;
		category?: boolean;
		active?: boolean;
		// TODO: new columns
	};
	orderByColumns?: {
		name?: boolean;
		email?: boolean;
		// TODO: new columns
	};
	selectable?: boolean;
	searchAttrs?: string[];
	allowDelete?: boolean;
	loading?: boolean;
	detailId?: string;
	onToggle: (data: any) => void;
	onDelete: (data: any) => void;
	withLanguageToggle?: boolean;
}

const Table: React.FC<ListItemsProps> = (props) => {
	const { t } = useTranslation(['common', 'message', 'component']);
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
		route,
		selectable,
		searchAttrs = [],
		onToggle,
		onDelete,
		allowDelete,
		detailId,
		loading,
		withLanguageToggle,
	} = props;
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
	const [lang, setLang] = useState(CFG.PROJECT.LANG_DEFAULT);

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
						{record.lang[lang].title}
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
				render: (text) => (
					<RowIconBlock
						dangerouslySetInnerHTML={{
							__html: {
								0: IconMaterial_Face,
								2: IconMaterial_PermIdentity,
								3: IconMaterial_SupervisorAccount,
								5: IconMaterial_SupervisedUserCircle,
								7: IconMaterial_VerifiedUser,
							}[text],
						}}
					/>
				),
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
						{withLanguageToggle && (
							<LanguageToggle onChange={(lang) => setLang(lang)} />
						)}
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
