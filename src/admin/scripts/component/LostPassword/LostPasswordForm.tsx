import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import config from '../../config';
import {
	EMAIL_REGEX,
	MESSAGE_ERROR_DURATION,
	MESSAGE_SUCCESS_DURATION,
	ROUTES,
} from '../../constants';
import media from '../../styles/responsive';
import { Button } from '../ui';
import { Link } from 'react-router-dom';
import LocaleDropdown from '../Profile/LocaleDropdown';
import { useProfile } from '../../App/hooks';
import { useTranslation } from 'react-i18next';

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

interface LostPasswordFormProps {}

const LostPasswordForm: React.FC<LostPasswordFormProps> = (props) => {
	const { children } = props;
	const { t } = useTranslation(['message', 'component']);
	const { token } = useParams<any>();
	const [processing, setProcessing] = useState(false);
	const [requestSend, setRequestSend] = useState(false);
	const { control, handleSubmit, formState } = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
		},
	});
	const {
		userLostPassword,
		userLostPasswordReset,
		reloadProfile,
	} = useProfile();
	const history = useHistory();

	const submitHandler = (data) => {
		setProcessing(true);
		return userLostPassword(data).then((res) => {
			setProcessing(false);

			if (res?.data?.message) {
				switch (res.data.message) {
					case 'user_not_found':
						return message.warning(
							t('message:userLostPassword.user_not_found'),
							MESSAGE_ERROR_DURATION,
						);

					case 'user_not_active':
						return message.warning(
							t('message:userLostPassword.user_not_active'),
							MESSAGE_ERROR_DURATION,
						);

					case 'user_is_deleted':
						return message.warning(
							t('message:userLostPassword.user_is_deleted'),
							MESSAGE_ERROR_DURATION,
						);

					case 'request_was_send':
						return reloadProfile().then(() => {
							message.success(
								t('message:userLostPassword.request_was_send'),
								MESSAGE_SUCCESS_DURATION * 2,
							);
						});
				}
			}
		});
	};
	const parameterHandler = (token) => {
		setProcessing(true);
		return userLostPasswordReset({ token: token }).then((res) => {
			setRequestSend(true);
			setProcessing(false);

			if (res?.data?.message) {
				switch (res.data.message) {
					case 'user_password_reset_error':
						message.warning(
							t('message:userLostPassword.reset.user_password_reset_error'),
							MESSAGE_ERROR_DURATION,
						);

						// history.push(CFG.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'token_not_found':
						message.success(
							t('message:userLostPassword.reset.token_not_found'),
							MESSAGE_ERROR_DURATION,
						);

						history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'request_not_found':
						message.warning(
							t('message:userLostPassword.reset.request_not_found'),
							MESSAGE_ERROR_DURATION,
						);

						history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'user_password_already_reset':
						message.warning(
							t('message:userLostPassword.reset.user_password_already_reset'),
							MESSAGE_ERROR_DURATION,
						);

						history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'user_password_reset_success':
						message.success(
							t('message:userLostPassword.reset.user_password_reset_success'),
							MESSAGE_SUCCESS_DURATION,
						);

						history.push(config.GLOBAL.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;
				}
			}
		});
	};

	useEffect(() => {
		if (token && !requestSend) parameterHandler(token);
	}, [token]);

	return (
		<>
			<LocaleDropdown />
			<Wrapper>
				<BlockBrand>
					<BlockInner>{children}</BlockInner>
				</BlockBrand>
				<BlockForm className="as-column">
					<FormTitle>{t('component:LostPasswordForm.title')}</FormTitle>
					{token ? (
						<BlockInner>
							{t('component:LostPasswordForm.processing')}
						</BlockInner>
					) : (
						<BlockInner>
							<Form
								onFinish={handleSubmit(submitHandler)}
								style={{ width: '80%' }}
							>
								<Form.Item>
									<Controller
										name="email"
										control={control}
										rules={{
											required: true,
											pattern: EMAIL_REGEX,
										}}
										render={({ name, value, onChange }) => (
											<Input
												type={'email'}
												name={name}
												value={value}
												onChange={onChange}
												placeholder={t(
													'component:LostPasswordForm.input_email_placeholder',
												)}
												prefix={
													<UserOutlined className="site-form-item-icon" />
												}
												style={{ width: '100%' }}
											/>
										)}
									/>
								</Form.Item>
								<Form.Item>
									<Button.Base
										type={'primary'}
										htmlType={'submit'}
										style={{ width: '100%' }}
										disabled={!formState.isValid || processing}
									>
										{t('component:LostPasswordForm.btn_submit')}
									</Button.Base>
								</Form.Item>
								<Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
									<Link to={ROUTES.app['login'].path}>
										{t('component:LostPasswordForm.btn_logIn')}
									</Link>
								</Form.Item>
							</Form>
						</BlockInner>
					)}
				</BlockForm>
			</Wrapper>
		</>
	);
};

export default LostPasswordForm;
