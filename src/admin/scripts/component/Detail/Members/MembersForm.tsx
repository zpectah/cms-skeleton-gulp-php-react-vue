import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch } from 'antd';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { MembersItemProps } from '../../../Members/types';
import { Modal, Typography, Form, Section } from '../../ui';
import { useMembers } from '../../../Members/hooks';
import DetailFooter from '../DetailFooter';

interface MembersDetailFormProps {
	detailData: MembersItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const MembersDetailForm: React.FC<MembersDetailFormProps> = (props) => {
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
	const userModel = !detailData.is_new || false;

	const { updateMembers, createMembers, reloadMembers } = useMembers();

	const submitHandler = (data) => {
		if (detailData.is_new) {
			createMembers(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		} else {
			updateMembers(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		}

		setTimeout(() => reloadMembers(), SUBMIT_TIMEOUT);
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
					name="img_avatar"
					ref={register({})}
					defaultValue={detailData.img_avatar}
				/>
			</div>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Members').toLowerCase()
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
						rules={{ required: userModel }}
						required={userModel}
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
						rules={{ required: userModel }}
						required={userModel}
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
					{''}
					<Form.Row
						label={'Country'}
						name={'member_country'}
						control={control}
						defaultValue={detailData.member_country || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Coutry'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'City'}
						name={'member_city'}
						control={control}
						defaultValue={detailData.member_city || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'City'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Address'}
						name={'member_address'}
						control={control}
						defaultValue={detailData.member_address || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Address'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'ZIP Code'}
						name={'member_zip'}
						control={control}
						defaultValue={detailData.member_zip || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'ZIP Code'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Phone'}
						name={'member_phone'}
						control={control}
						defaultValue={detailData.member_phone || []}
					>
						{(row) => (
							<Select
								mode="tags"
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Phone'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Alternative E-mail'}
						name={'member_email'}
						control={control}
						defaultValue={detailData.member_email || []}
					>
						{(row) => (
							<Select
								mode="tags"
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'E-mails'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Description'}
						name={'description'}
						control={control}
						defaultValue={detailData.description || ''}
						long
					>
						{(row) => (
							<Input.TextArea
								id={row.id}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Description'}
								rows={5}
							/>
						)}
					</Form.Row>
					{''}
					<Form.Row
						label={'Level'}
						name={'member_level'}
						control={control}
						defaultValue={detailData.member_level || 0}
					>
						{(row) => (
							<Select
								id={row.id}
								style={{ width: '100%' }}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select level'}
							>
								{config.OPTIONS.model.Members.level.map((item) => (
									<Select.Option value={item.value} key={item.value}>
										{t(`types:${item.label}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
					<Form.Row
						label={'Group'}
						name={'member_group'}
						control={control}
						defaultValue={detailData.member_group || 'none'}
					>
						{(row) => (
							<Select
								id={row.id}
								style={{ width: '100%' }}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select group'}
							>
								{config.OPTIONS.model.Members.group_list.map((item) => (
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

export default MembersDetailForm;
