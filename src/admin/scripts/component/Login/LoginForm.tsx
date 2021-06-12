import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Form as AntdForm, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import {
	EMAIL_REGEX,
	MESSAGE_SUCCESS_DURATION,
	MESSAGE_ERROR_DURATION,
	ROUTES,
} from '../../constants';
import media from '../../styles/responsive';
import { Button } from '../ui';
import LocaleDropdown from '../Profile/LocaleDropdown';
import { useProfile } from '../../App/hooks';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: rgb(250, 250, 250);

	${media.min.md} {
		width: 70vw;
		min-height: 300px;
		flex-direction: row;
	}
	${media.min.lg} {
		width: 900px;
	}
`;
const BlockBrand = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const BlockForm = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	&.as-column {
		flex-direction: column;
	}
`;
const BlockInner = styled.div`
	width: 100%;
	padding: 1rem 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;
const FormTitle = styled.h3`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0.5rem 0;
	text-align: center;
`;
const TemporaryBlock = styled.div`
	width: 100%;
	height: auto;
	min-height: 150px;
	text-align: center;
`;

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = (props) => {
	const { children } = props;
	const { t } = useTranslation(['message', 'component']);
	const { Profile, userLogin, reloadProfile, userLogout } = useProfile();
	const [processing, setProcessing] = useState(false);
	const { control, handleSubmit, formState } = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const history = useHistory();

	const logoutHandler = () => {
		userLogout({}).then(() => reloadProfile());
	};
	const submitHandler = (data) => {
		setProcessing(true);
		return userLogin(data).then((res) => {
			setProcessing(false);

			if (res?.data?.message) {
				switch (res.data.message) {
					case 'user_not_found':
						return message.warning(
							t('message:userLogin.user_not_found'),
							MESSAGE_ERROR_DURATION,
						);

					case 'user_not_active':
						return message.warning(
							t('message:userLogin.user_not_active'),
							MESSAGE_ERROR_DURATION,
						);

					case 'user_is_deleted':
						return message.warning(
							t('message:userLogin.user_is_deleted'),
							MESSAGE_ERROR_DURATION,
						);

					case 'user_password_not_match':
						return message.warning(
							t('message:userLogin.user_password_not_match'),
							MESSAGE_ERROR_DURATION,
						);

					case 'user_login_success':
						return reloadProfile().then(() => {
							message.success(
								t('message:userLogin.user_login_success'),
								MESSAGE_SUCCESS_DURATION,
							);
							history.push(ROUTES.app.dashboard.path);
						});
				}
			}
		});
	};

	return (
		<>
			<LocaleDropdown />
			<Wrapper>
				<BlockBrand>
					<BlockInner>{children}</BlockInner>
				</BlockBrand>
				<BlockForm className="as-column">
					<FormTitle>{t('component:LoginForm.title')}</FormTitle>
					{Profile ? (
						<BlockInner>
							<TemporaryBlock>
								<p>{t('component:LoginForm.alreadyLogIn')}</p>
								<p>
									<Link to={ROUTES.app.dashboard.path}>
										{t('component:LoginForm.btn_returnToDashboard')}
									</Link>
									<br />
									<a onClick={logoutHandler}>
										{t('component:LoginForm.btn_logOut')}
									</a>
								</p>
							</TemporaryBlock>
						</BlockInner>
					) : (
						<BlockInner>
							<AntdForm
								onFinish={handleSubmit(submitHandler)}
								style={{ width: '80%' }}
							>
								<AntdForm.Item>
									<Controller
										name="email"
										control={control}
										rules={{ required: true, pattern: EMAIL_REGEX }}
										render={({ name, value, onChange }) => (
											<Input
												type={'email'}
												name={name}
												value={value}
												onChange={onChange}
												placeholder={t(
													'component:LoginForm.input_email_placeholder',
												)}
												prefix={
													<UserOutlined className="site-form-item-icon" />
												}
												style={{ width: '100%' }}
											/>
										)}
									/>
								</AntdForm.Item>
								<AntdForm.Item>
									<Controller
										name="password"
										control={control}
										rules={{ required: true, minLength: 4 }}
										render={({ name, value, onChange }) => (
											<Input
												type={'password'}
												name={name}
												value={value}
												onChange={onChange}
												placeholder={t(
													'component:LoginForm.input_password_placeholder',
												)}
												prefix={
													<LockOutlined className="site-form-item-icon" />
												}
												style={{ width: '100%' }}
											/>
										)}
									/>
								</AntdForm.Item>
								<AntdForm.Item>
									<Button.Base
										type={'primary'}
										htmlType={'submit'}
										style={{ width: '100%' }}
										disabled={!formState.isValid || processing}
									>
										{t('component:LoginForm.btn_submit')}
									</Button.Base>
								</AntdForm.Item>
								<AntdForm.Item style={{ textAlign: 'center', marginBottom: 0 }}>
									<Link to={ROUTES.app['lost-password'].path}>
										{t('component:LoginForm.btn_lostPassword')}
									</Link>
								</AntdForm.Item>
							</AntdForm>
						</BlockInner>
					)}
				</BlockForm>
			</Wrapper>
		</>
	);
};

export default LoginForm;
