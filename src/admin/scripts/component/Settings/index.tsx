import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { Form as AntdForm, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { EMAIL_REGEX } from '../../constants';
import { Button, Form } from '../ui';

interface SettingsProps {
	route: any; // TODO
	panelKey?: string;
	loading?: boolean;
	model: any; // TODO
}

const Settings: React.FC<SettingsProps> = (props) => {
	const history = useHistory();
	const { route, panelKey, model, loading } = props;
	const { control, handleSubmit, formState } = useForm({
		mode: 'onChange',
		defaultValues: { ...model },
	});
	const { TabPane } = Tabs;

	const submitHandler = (data) => {
		//
		console.log('Submit handler', data);
		//
	};

	return (
		<AntdForm onFinish={handleSubmit(submitHandler)}>
			<Tabs
				defaultActiveKey={panelKey ? panelKey : 'global'}
				onChange={(activeKey) => history.push(`${route.path}/${activeKey}`)}
			>
				<TabPane tab="Global" key="global">
					<div>
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
						<br />
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
						<br />
						Project & paths
						<br />
						Company
						<br />
						Contacts ...
					</div>
				</TabPane>
				<TabPane tab="Web" key="web">
					<div>
						Members login
						<br />
						Paths to pages (override system default pages...)
						<br />
						Other settings...
					</div>
				</TabPane>
				<TabPane tab="Admin" key="admin">
					<div>
						User options settings
						<br />
						Administrator contact...
					</div>
				</TabPane>
				<TabPane tab="Module" key="module">
					<div>
						Crm module settings
						<br />
						Market module settings
					</div>
				</TabPane>
			</Tabs>
			<div>
				<Button.Base
					type={'primary'}
					htmlType={'submit'}
					disabled={!formState.isValid}
				>
					Update
				</Button.Base>
			</div>
		</AntdForm>
	);
};

export default Settings;
