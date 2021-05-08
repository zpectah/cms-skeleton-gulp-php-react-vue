import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { message } from 'antd';

import { Form as UiForm, Section, Button } from '../ui';
import LocaleToggle from './LocaleToggle';
import { Input } from 'antd';
import { useProfile } from '../../App/hooks';

const Wrapper = styled.div``;

interface FormProps {
	model: any;
	afterUpdate?: Function;
}

const Form: React.FC<FormProps> = ({ model, afterUpdate }) => {
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			...model,
		},
	});
	const { updateProfile, reloadProfile } = useProfile();

	const submitHandler = (data) => {
		return updateProfile(data).then((res) => {
			message.success('Profile has been updated', 2.5);
			afterUpdate();
			reloadProfile();
		});
	};

	return (
		<Wrapper>
			<LocaleToggle />
			<div>card data ... {model.email}</div>
			<form onSubmit={handleSubmit(submitHandler)}>
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
				<Section.Base>
					<UiForm.Row label={'Password'} name={'password'} control={control}>
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
					<UiForm.Row label={'Last name'} name={'last_name'} control={control}>
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
				{/* TODO */}
				<Button.Base
					htmlType="submit"
					disabled={!formState.isValid || !formState.isDirty}
					type="primary"
				>
					Update
				</Button.Base>
				{/* TODO */}
			</form>
		</Wrapper>
	);
};

export default Form;
