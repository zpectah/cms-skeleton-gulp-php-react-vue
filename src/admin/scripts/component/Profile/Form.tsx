import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { message, Descriptions } from 'antd';

import { Form as UiForm, Section, Button, Modal, Icon } from '../ui';
import FileUpload from '../FileUpload';
import LocaleToggle from './LocaleToggle';
import ThemeToggle from './ThemeToggle';
import { Input } from 'antd';
import { useProfile } from '../../App/hooks';

const Wrapper = styled.div``;
const AvatarContainer = styled.div`
	width: 100%;
	height: 100px;
	padding: 0 2rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	background-color: rgba(200, 200, 200, 0.5);
	background-image: linear-gradient(
		45deg,
		${(props) => props.theme.color.primary},
		${(props) => props.theme.color.pink}
	);
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	position: relative;
	overflow: hidden;

	& .avatar-email {
		padding-left: 1rem;
		font-size: 1.25rem;
		font-weight: 500;
		color: ${(props) => props.theme.color.white};
	}
`;
const FormContainer = styled.div``;

interface FormProps {
	model: any;
	afterUpdate?: Function;
}

const Form: React.FC<FormProps> = ({ model, afterUpdate }) => {
	const { control, handleSubmit, formState, register, setValue } = useForm({
		mode: 'onChange',
		defaultValues: {
			...model,
		},
	});
	const { updateProfile, reloadProfile } = useProfile();
	const [formOpen, setFormOpen] = useState(false);

	const submitHandler = (data) => {
		return updateProfile(data).then((res) => {
			message.success('Profile has been updated', 2.5);
			afterUpdate();
			reloadProfile();
		});
	};

	const avatarChangeHandler = (value) => {
		console.log('avatarChangeHandler ', value);
		// setValue('user_avatar', value);
	};

	return (
		<Wrapper>
			<AvatarContainer>
				<div>
					<FileUpload.Avatar
						label={
							model.first_name && model.last_name
								? model.first_name.charAt(0) + model.last_name.charAt(0)
								: model.nickname.charAt(0)
						}
						src={model.user_avatar}
						onChange={avatarChangeHandler}
					/>
				</div>
				<div className="avatar-email">{model.email}</div>
			</AvatarContainer>
			<Modal.Content>
				<Section.Base>
					{!formOpen && (
						<div>
							<Descriptions>
								<Descriptions.Item label="Nick">
									{model.nickname}
								</Descriptions.Item>
								<Descriptions.Item label="Full Name" span={2}>
									{model.first_name}{' '}
									{model.middle_name && model.middle_name + ' '}
									{model.last_name}
								</Descriptions.Item>
								<Descriptions.Item label="Level">
									<Icon.Profile level={model.user_level} size={20} />
								</Descriptions.Item>
								<Descriptions.Item label="Group">
									{model.user_group}
								</Descriptions.Item>
							</Descriptions>
						</div>
					)}
					<UiForm.RowNoController label={'Language'}>
						{() => <LocaleToggle />}
					</UiForm.RowNoController>
					<UiForm.RowNoController label={'Theme'}>
						{() => <ThemeToggle />}
					</UiForm.RowNoController>
					{!formOpen && (
						<div>
							<Button.Base onClick={() => setFormOpen(!formOpen)}>
								Edit profile
							</Button.Base>
						</div>
					)}
				</Section.Base>
				{formOpen && (
					<FormContainer>
						<form onSubmit={handleSubmit(submitHandler)}>
							<div>
								<input
									type="hidden"
									name="id"
									ref={register({ required: true })}
									defaultValue={model.id}
								/>
								<input
									type="hidden"
									name="email"
									ref={register({ required: true })}
									defaultValue={model.email}
								/>
								<input
									type="hidden"
									name="user_level"
									ref={register({ required: true })}
									defaultValue={model.user_level}
								/>
								<input
									type="hidden"
									name="user_group"
									ref={register({ required: true })}
									defaultValue={model.user_group}
								/>
								<input
									type="hidden"
									name="active"
									ref={register({ required: true })}
									defaultValue={model.active}
								/>
								<input
									type="hidden"
									name="user_avatar"
									ref={register({})}
									defaultValue={model.user_avatar}
								/>
							</div>
							<Section.Base>
								<UiForm.Row
									label={'New password'}
									name={'password'}
									control={control}
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
								</UiForm.Row>
								<UiForm.Row
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
								</UiForm.Row>
								<UiForm.Row
									label={'First name'}
									name={'first_name'}
									control={control}
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
								</UiForm.Row>
								<UiForm.Row
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
								</UiForm.Row>
								<UiForm.Row
									label={'Last name'}
									name={'last_name'}
									control={control}
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
								</UiForm.Row>
							</Section.Base>
							<Section.Base>
								<Button.Base onClick={() => setFormOpen(false)}>
									Cancel
								</Button.Base>
								<Button.Base
									htmlType="submit"
									disabled={!formState.isValid || !formState.isDirty}
									type="primary"
								>
									Update
								</Button.Base>
							</Section.Base>
						</form>
					</FormContainer>
				)}
			</Modal.Content>
		</Wrapper>
	);
};

export default Form;
