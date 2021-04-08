import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { EMAIL_REGEX } from '../../constants';
import routes from '../../App/routes.json';
import { minWidth } from '../../styles/responsive';
import { Button } from '../ui';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: rgb(250, 250, 250);

	${minWidth.md} {
		width: 70vw;
		min-height: 300px;
		flex-direction: row;
	}
	${minWidth.lg} {
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

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
	const { children } = props;
	const { control, handleSubmit, formState } = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const submitHandler = (data) => {
		//
		console.log('Submit handler', data);
		//
	};

	return (
		<>
			<Wrapper>
				<BlockBrand>
					<BlockInner>{children}</BlockInner>
				</BlockBrand>
				<BlockForm>
					<BlockInner>
						<Form
							onFinish={handleSubmit(submitHandler)}
							style={{ width: '80%' }}
						>
							<Form.Item>
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
							</Form.Item>
							<Form.Item>
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
							</Form.Item>
							<Form.Item>
								<Button.Base
									type={'primary'}
									htmlType={'submit'}
									style={{ width: '100%' }}
									disabled={!formState.isValid}
								>
									Log in
								</Button.Base>
							</Form.Item>
							<Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
								<Link to={routes['lost-password'].path}>Lost password</Link>
							</Form.Item>
						</Form>
					</BlockInner>
				</BlockForm>
			</Wrapper>
		</>
	);
};

export default Login;
