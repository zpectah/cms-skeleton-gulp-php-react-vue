import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch } from 'antd';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { UsersItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section } from '../../ui';
import { useUsers } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';

interface UsersDetailFormProps {
	detailData: UsersItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const UsersDetailForm: React.FC<UsersDetailFormProps> = (props) => {
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { t } = useTranslation(['common', 'types']);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			...detailData,
		},
	});

	const { updateUsers, createUsers, reloadUsers } = useUsers();

	const submitHandler = (data) => {
		if (detailData.is_new) {
			createUsers(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		} else {
			updateUsers(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		}

		setTimeout(() => reloadUsers(), SUBMIT_TIMEOUT);
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
				<input
					type="hidden"
					name="user_avatar"
					ref={register({})}
					defaultValue={detailData.user_avatar}
				/>
			</div>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.is_new
						? t('title.create_new') + ' ' + t('model_item.Users').toLowerCase()
						: detailData.email}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<Form.Row
						label={'E-mail'}
						name={'email'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.email || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'email'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'E-mail'}
								disabled={!detailData.is_new}
								// maybe set undisabled for superadmin?
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Password'}
						name={'password'}
						control={control}
						rules={{ required: detailData.is_new }}
						required={detailData.is_new}
						defaultValue={detailData.password || ''}
					>
						{(row) => (
							<Input.Password
								id={row.id}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'New password'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Nickname'}
						name={'nickname'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.nickname || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Nickname'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'First name'}
						name={'first_name'}
						control={control}
						defaultValue={detailData.first_name || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'First name'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Middle name'}
						name={'middle_name'}
						control={control}
						defaultValue={detailData.middle_name || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Middle name'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Last name'}
						name={'last_name'}
						control={control}
						defaultValue={detailData.last_name || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Last name'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Level'}
						name={'user_level'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.user_level || 0}
					>
						{(row) => (
							<Select
								id={row.id}
								style={{ width: '100%' }}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select level'}
							>
								{config.OPTIONS.model.Users.level.map((item) => (
									<Select.Option value={item.value} key={item.value}>
										{t(`types:${item.label}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
					<Form.Row
						label={'Group'}
						name={'user_group'}
						control={control}
						defaultValue={detailData.user_group || 'default'}
					>
						{(row) => (
							<Select
								id={row.id}
								style={{ width: '100%' }}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select group'}
							>
								{config.OPTIONS.model.Users.group_list.map((item) => (
									<Select.Option value={item} key={item}>
										{t(`types:${item}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
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

export default UsersDetailForm;
