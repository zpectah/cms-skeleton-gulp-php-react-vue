import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch } from 'antd';

import OPTIONS from '../../../../../config/options.json';
import { UsersItemProps } from '../../../App/types';
import { Button, Modal, Typography, Form, Section } from '../../ui';
import { useUsers } from '../../../App/hooks';

interface UsersDetailFormProps {
	detailData: UsersItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const UsersDetailForm: React.FC<UsersDetailFormProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			nickname: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			user_level: 0,
			user_group: 'default',
			active: 1,
			...detailData,
		},
	});

	const { updateUsers, createUsers, reload } = useUsers();

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

		setTimeout(() => reload(), 750);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<input
				type="hidden"
				name="id"
				ref={register({ required: true })}
				defaultValue={detailData.id}
			/>
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
					>
						{(row) => (
							<Input
								id={row.id}
								type={'email'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Name'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Password'}
						name={'password'}
						control={control}
						rules={{ required: true }}
						required
					>
						{(row) => (
							<Input
								id={row.id}
								type={'password'}
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
					<Form.Row label={'First name'} name={'first_name'} control={control}>
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
					<Form.Row label={'Last name'} name={'last_name'} control={control}>
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
					>
						{(row) => (
							<Select
								id={row.id}
								style={{ width: '100%' }}
								options={OPTIONS.model.Users.level}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select level'}
							/>
						)}
					</Form.Row>
					<Form.Row label={'Group'} name={'user_group'} control={control}>
						{(row) => (
							<Select
								id={row.id}
								style={{ width: '100%' }}
								options={OPTIONS.model.Users.group}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select group'}
							/>
						)}
					</Form.Row>
					<Form.Row label={'Active'} name={'active'} control={control}>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
				</Section.Base>
			</Modal.Content>
			<Modal.Footer>
				<Button.Base onClick={() => onCancel()}>{t('btn.close')}</Button.Base>
				{!detailData.is_new && (
					<>
						<Button.Base
							type="primary"
							onClick={() => onDelete(detailData)}
							danger
						>
							{t('btn.delete')}
						</Button.Base>
					</>
				)}
				<Button.Base
					type="primary"
					htmlType="submit"
					disabled={!formState.isValid}
				>
					{detailData.is_new ? t('btn.create') : t('btn.save')}
				</Button.Base>
			</Modal.Footer>
		</form>
	);
};

export default UsersDetailForm;
