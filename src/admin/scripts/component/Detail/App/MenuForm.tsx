import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch } from 'antd';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { string } from '../../../../../libs/js/utils';
import { useMenu } from '../../../App/hooks';
import { MenuItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section } from '../../ui';
import Picker from '../../Picker';
import Manager from '../../Manager';
import DetailFooter from '../DetailFooter';

interface MenuDetailFormProps {
	detailData: MenuItemProps;
	onCancel: Function;
	onSave: (data: MenuItemProps, response: any) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const MenuDetailForm: React.FC<MenuDetailFormProps> = ({
	detailData,
	onCancel,
	onSave,
	onDelete,
	allowSave,
	allowDelete,
}) => {
	const { t } = useTranslation(['common', 'types']);
	const { updateMenu, createMenu, reloadMenu } = useMenu();
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			...detailData,
		},
	});

	const submitHandler = (data) => {
		const master = {
			...data,
			name: string.replaceSpaces(data.name),
		};

		if (detailData.is_new) {
			createMenu(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateMenu(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadMenu(), SUBMIT_TIMEOUT);
	};

	return (
		<form>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') + ' ' + t('model_item.Menu').toLowerCase()
						: detailData.name}
				</div>
			</Modal.Header>
			<Modal.Content>
				<Section.Base withBorder>
					<div>
						<input
							type="hidden"
							name="id"
							ref={register({ required: true })}
							defaultValue={detailData.id}
						/>
					</div>
					<Form.Row
						label={'Name'}
						name={'name'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.name || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Name'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Type'}
						name={'type'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.type || 'default'}
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select type'}
							>
								{config.OPTIONS.model.Menu.type_list.map((item) => (
									<Select.Option value={item} key={item}>
										{t(`types:${item}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
					<Form.Row
						label={'Parent'}
						name={'parent'}
						control={control}
						defaultValue={detailData.parent || ''}
					>
						{(row) => (
							<Picker.Menu
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								ignoredId={detailData.id !== 'new' && [detailData.id]}
								single
							/>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Active'}
						name={'active'}
						control={control}
						defaultValue={detailData.active || true}
					>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base>
					<Form.RowNoController label={'Menu items'} long>
						{() => (
							<>
								{detailData.is_new ? (
									<div>Menu items should be added when menu is created ...</div>
								) : (
									<Manager.MenuItems
										menuId={detailData.id}
										onUpdate={() => {
											console.log('onUpdate menu items');
										}}
									/>
								)}
							</>
						)}
					</Form.RowNoController>
				</Section.Base>
			</Modal.Content>
			<DetailFooter
				onCancel={onCancel}
				onDelete={onDelete}
				isNew={detailData.is_new}
				invalid={!formState.isValid}
				detailData={detailData}
				allowSave={allowSave}
				allowDelete={allowDelete}
				onSubmit={handleSubmit(submitHandler)}
			/>
		</form>
	);
};

export default MenuDetailForm;
