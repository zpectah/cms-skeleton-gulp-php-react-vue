import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {
	EMAIL_REGEX,
	MESSAGE_ERROR_DURATION,
	MESSAGE_SUCCESS_DURATION,
} from '../../constants';
import media from '../../styles/responsive';
import { Button } from '../ui';
import { Link } from 'react-router-dom';
import routes from '../../App/routes.json';
import LocaleDropdown from '../Profile/LocaleDropdown';
import { useProfile } from '../../App/hooks';
import CFG from '../../../../config/global.json';
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
`;
const BlockInner = styled.div`
	width: 100%;
	padding: 1rem 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

interface LostPasswordFormProps {}

const LostPasswordForm: React.FC<LostPasswordFormProps> = (props) => {
	const { children } = props;
	const { t } = useTranslation(['message']);
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
		//
		console.log('token found ', token);
		return userLostPasswordReset({ token: token }).then((res) => {
			console.log('userLostPasswordReset ', res);
			setRequestSend(true);

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

						history.push(CFG.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'request_not_found':
						message.warning(
							t('message:userLostPassword.reset.request_not_found'),
							MESSAGE_ERROR_DURATION,
						);

						history.push(CFG.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'user_password_already_reset':
						message.warning(
							t('message:userLostPassword.reset.user_password_already_reset'),
							MESSAGE_ERROR_DURATION,
						);

						history.push(CFG.CMS.UNAUTHORIZED_REDIRECT_TARGET);
						break;

					case 'user_password_reset_success':
						message.success(
							t('message:userLostPassword.reset.user_password_reset_success'),
							MESSAGE_SUCCESS_DURATION,
						);

						history.push(CFG.CMS.UNAUTHORIZED_REDIRECT_TARGET);
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
				<BlockForm>
					{token ? (
						<BlockInner>
							Your request has been processing, your new password is in your
							e-mail inbox
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
												placeholder={'E-mail'}
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
										Submit request
									</Button.Base>
								</Form.Item>
								<Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
									<Link to={routes['login'].path}>Log in</Link>
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
