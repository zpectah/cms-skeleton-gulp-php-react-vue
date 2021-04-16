import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { Form as AntdForm, Input, Select, Switch } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { routeProps } from '../../types';
import { EMAIL_REGEX } from '../../constants';
import { Button, Form, Card, Section } from '../ui';

const ActionRow = styled.div`
	padding-top: 1rem;
`;

interface SettingsProps {
	route: routeProps;
	panelKey?: string;
	loading?: boolean;
	model: any; // TODO ...
}

const Settings: React.FC<SettingsProps> = (props) => {
	const history = useHistory();
	const { route, panelKey, model, loading } = props;
	const { control, handleSubmit, formState, setValue } = useForm({
		mode: 'onChange',
		defaultValues: model,
	});
	const { TabPane } = Tabs;
	const [updating, setUpdating] = useState<boolean>(false);

	const submitHandler = (data, event) => {
		//
		console.log(event);
		console.log('Submit handler', data);
		setUpdating(true);
		setTimeout(() => {
			setUpdating(false);
		}, 1000);
		//
	};

	return (
		<AntdForm onFinish={handleSubmit(submitHandler)}>
			<Tabs
				defaultActiveKey={panelKey ? panelKey : 'global'}
				onChange={(activeKey) => history.push(`${route.path}/${activeKey}`)}
			>
				<TabPane tab="Global" key="global">
					<Card withNegativeOffsetTop>
						<Section title={'Project'}>
							<Form.Row
								label={'Project name'}
								name={'project_name'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Project name'}
									/>
								)}
							</Form.Row>
						</Section>
						<Section title={'Company'}>
							<Form.Row
								label={'Company name'}
								name={'company_name'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company name'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company description'}
								name={'company_description'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company description'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company ID'}
								name={'company_id'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company ID'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company address'}
								name={'company_address'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company address'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company city'}
								name={'company_city'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company city'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company country'}
								name={'company_country'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company country'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company zip'}
								name={'company_zip'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company zip'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company location'}
								name={'company_location'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company location object'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company email'}
								name={'company_email'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Select
										mode="tags"
										style={{ width: '100%' }}
										id={row.id}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company emails'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company phone'}
								name={'company_phone'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Select
										mode="tags"
										style={{ width: '100%' }}
										id={row.id}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company phone'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Company bank'}
								name={'company_bank_account_primary'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company bank account'}
									/>
								)}
							</Form.Row>
						</Section>
					</Card>
				</TabPane>
				<TabPane tab="Web" key="web">
					<Card withNegativeOffsetTop>
						<Section title={'Forms'}>
							<Form.Row
								label={'Form sender email'}
								name={'form_sender_email'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Form sender email'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Form recipients email'}
								name={'form_recipients_email'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Select
										mode="tags"
										style={{ width: '100%' }}
										id={row.id}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Form recipients emails'}
									/>
								)}
							</Form.Row>
						</Section>
						<Section title={'Language'}>
							{/* TODO: Installer for languages */}
							<Form.Row
								label={'Language default'}
								name={'language_default'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Default language'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Installed languages'}
								name={'language_installed'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Installed languages'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Active languages'}
								name={'language_active'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Active languages'}
									/>
								)}
							</Form.Row>
						</Section>
						<Section title={'Page meta'}>
							<Form.Row
								label={'Page meta title'}
								name={'meta_title'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page meta title'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Page meta description'}
								name={'meta_description'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page meta description'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Page meta robots'}
								name={'meta_robots'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page meta robots'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Page meta keywords'}
								name={'meta_keywords'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page meta keywords'}
									/>
								)}
							</Form.Row>
						</Section>
						<Section title={'Page mode'}>
							<Form.Row
								label={'Page in maintenance'}
								name={'mode_maintenance'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'Page in debug'}
								name={'mode_debug'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'Page in development'}
								name={'mode_development'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
						</Section>
						<Section title={'Default pages'}>
							<Form.Row
								label={'Page home'}
								name={'page_default_home'}
								control={control}
								rules={{ required: true }}
								// TODO: select from page list ...
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page home'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Page error404'}
								name={'page_default_error404'}
								control={control}
								rules={{ required: true }}
								// TODO: select from page list ...
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page error404'}
									/>
								)}
							</Form.Row>
						</Section>
						<Section title={'Comments'}>
							<Form.Row
								label={'Comments active'}
								name={'comments_global_active'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'Comments allowed for anonymous'}
								name={'comments_anonymous_active'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
						</Section>
					</Card>
				</TabPane>
				<TabPane tab="Admin" key="admin">
					<Card withNegativeOffsetTop>
						<Section title={'Admin approval'}>
							<Form.Row
								label={'Admin content approval'}
								name={'admin_content_approval'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
						</Section>
						<Section title={'Members'}>
							{/* TODO: If Module CRM installed */}
							<Form.Row
								label={'Members register active'}
								name={'members_register_active'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'Members login active'}
								name={'members_login_active'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'Members lost password active'}
								name={'members_lostPassword_active'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
						</Section>
					</Card>
				</TabPane>
				<TabPane tab="Module" key="module">
					<Card withNegativeOffsetTop>
						{/* TODO: Installer for CRM / Market Module */}
						<Section title={'Crm'}>
							<Form.Row
								label={'Module CRM active'}
								name={'module_crm_active'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'Module CRM installed'}
								name={'module_crm_installed'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
						</Section>
						<Section title={'Market'}>
							<Form.Row
								label={'Module Market active'}
								name={'module_market_active'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'Module Market installed'}
								name={'module_market_installed'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
						</Section>
					</Card>
				</TabPane>
			</Tabs>
			<ActionRow>
				<Button.Base
					type={'primary'}
					htmlType={'submit'}
					disabled={!formState.isValid || !formState.isDirty}
					loading={updating}
				>
					Update
				</Button.Base>
			</ActionRow>
		</AntdForm>
	);
};

export default Settings;
