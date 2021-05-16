import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch } from 'antd';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useMenu } from '../../../App/hooks';
import { MenuItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section, Picker } from '../../ui';
import DetailFooter from '../DetailFooter';
import OPTIONS from '../../../../../config/options.json';

interface MenuDetailFormProps {
	detailData: MenuItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
}

const MenuDetailForm: React.FC<MenuDetailFormProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			name: '',
			type: 'default',
			parent: '',
			active: 1,
			...detailData,
		},
	});
	const { updateMenu, createMenu, reloadMenu } = useMenu();
	const activeParentField = false; // TODO

	const submitHandler = (data) => {
		if (detailData.is_new) {
			createMenu(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		} else {
			updateMenu(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		}

		setTimeout(() => reloadMenu(), SUBMIT_TIMEOUT);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<input
				type="hidden"
				name="id"
				ref={register({ required: true })}
				defaultValue={detailData.id}
			/>
			{!activeParentField && (
				<input
					type="hidden"
					name="parent"
					ref={register({})}
					defaultValue={detailData.parent}
				/>
			)}
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.is_new
						? t('title.create_new') + ' ' + t('model_item.Menu').toLowerCase()
						: detailData.name}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<Form.Row
						label={'Name'}
						name={'name'}
						control={control}
						rules={{ required: true }}
						required
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
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select type'}
								options={OPTIONS.model.Menu.type}
							/>
						)}
					</Form.Row>
					{activeParentField && (
						<Form.Row label={'Parent'} name={'parent'} control={control}>
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
					)}
					<div>...menu items handler ...</div>
					<Form.Row label={'Active'} name={'active'} control={control}>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
				</Section.Base>
			</Modal.Content>
			<DetailFooter
				onCancel={onCancel}
				onDelete={onDelete}
				isNew={detailData.is_new}
				invalid={!formState.isValid}
				detailData={detailData}
			/>
		</form>
	);
};

export default MenuDetailForm;
