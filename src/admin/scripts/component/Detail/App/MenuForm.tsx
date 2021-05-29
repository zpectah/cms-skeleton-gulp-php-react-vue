import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch } from 'antd';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { useMenu } from '../../../App/hooks';
import { MenuItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section, Picker } from '../../ui';
import DetailFooter from '../DetailFooter';

interface MenuDetailFormProps {
	detailData: MenuItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const MenuDetailForm: React.FC<MenuDetailFormProps> = (props) => {
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
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
			<div>
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
			</div>
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
								options={config.OPTIONS.model.Menu.type}
							/>
						)}
					</Form.Row>
					{activeParentField && (
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
					)}
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
					<Form.RowNoController label={'Menu items'} long>
						{() => <div>...menu items picker ...</div>}
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
			/>
		</form>
	);
};

export default MenuDetailForm;
