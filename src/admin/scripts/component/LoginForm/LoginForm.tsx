import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Form as AntdForm, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import CFG from '../../../../config/global.json';
import { EMAIL_REGEX } from '../../constants';
import routes from '../../App/routes.json';
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
`;
const BlockInner = styled.div`
	width: 100%;
	padding: 1rem 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = (props) => {
	const { children } = props;
	const { userLogin, reloadProfile } = useProfile();
	const [processing, setProcessing] = useState(false);
	const { control, handleSubmit, formState } = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const history = useHistory();

	const submitHandler = (data) => {
		setProcessing(true);
		return userLogin(data).then((res) => {
			setProcessing(false);

			if (res?.data?.message) {
				switch (res.data.message) {
					case 'user_not_exist':
						return console.warn('Message: user_not_exist'); // TODO: message

					case 'user_not_active':
						return console.warn('Message: user_not_active'); // TODO: message

					case 'user_is_deleted':
						return console.warn('Message: user_is_deleted'); // TODO: message

					case 'user_password_not_match':
						return console.warn('Message: user_password_not_match'); // TODO: message

					case 'user_login_success':
						console.log('Message: success login'); // TODO: message
						return reloadProfile().then(() => {
							history.push(CFG.CMS.RESTRICTED_REDIRECT_TARGET);
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
				<BlockForm>
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
											placeholder={'E-mail'}
											prefix={<UserOutlined className="site-form-item-icon" />}
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
											placeholder={'Password'}
											prefix={<LockOutlined className="site-form-item-icon" />}
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
									Log in
								</Button.Base>
							</AntdForm.Item>
							<AntdForm.Item style={{ textAlign: 'center', marginBottom: 0 }}>
								<Link to={routes['lost-password'].path}>Lost password</Link>
							</AntdForm.Item>
						</AntdForm>
					</BlockInner>
				</BlockForm>
			</Wrapper>
		</>
	);
};

export default LoginForm;
