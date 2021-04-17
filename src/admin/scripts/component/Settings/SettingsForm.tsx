import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { Form as AntdForm, Input, Select, Switch, Checkbox, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import NUMS from '../../../../config/nums.json';
import { routeProps } from '../../types';
import { EMAIL_REGEX } from '../../constants';
import { Button, Form, Card, Section, Hr } from '../ui';
import LanguageInstaller from './LanguageInstaller';
import ModuleInstaller from './ModuleInstaller';

const ActionRow = styled.div`
	padding-top: 1rem;
`;

interface SettingsFormProps {
	route: routeProps;
	panelKey?: string;
	loading?: boolean;
	model: any; // TODO ...
}

const SettingsForm: React.FC<SettingsFormProps> = (props) => {
	const history = useHistory();
	const { route, panelKey, model, loading } = props;
	const { control, handleSubmit, formState, setValue, getValues } = useForm({
		mode: 'onChange',
		defaultValues: model,
	});
	const { TabPane } = Tabs;
	const [updating, setUpdating] = useState<boolean>(loading);
	const [tmpState, setTmpState] = useState<{
		language_installed: string[];
		language_active: any;
		language_default: string;
	}>({ language_installed: [], language_active: [], language_default: null });

	useEffect(() => {
		if (model)
			setTmpState({
				language_installed: model.language_installed,
				language_active: model.language_active,
				language_default: model.language_default,
			});
	}, [model]);

	const submitHandler = (data, event) => {
		//
		console.log(event);
		console.log('Submit handler', data);
		setUpdating(true);
		setTimeout(() => {
			console.log(formState);
			setUpdating(false);
		}, 1000);
		//
	};

	const getLanguageDefaultOptions = () => {
		let na = [];

		tmpState.language_active.map((lang) => {
			na.push({
				label: NUMS.languageTitle[lang],
				value: lang,
				disabled: false,
			});
		});

		return na;
	};

	const getActiveLanguagesOptions = () => {
		let na = [];

		tmpState.language_installed.map((lang) => {
			na.push({
				label: NUMS.languageTitle[lang],
				value: lang,
				disabled: tmpState.language_default == lang,
			});
		});

		return na;
	};

	return (
		<AntdForm onFinish={handleSubmit(submitHandler)}>
			<Tabs
				defaultActiveKey={panelKey ? panelKey : 'global'}
				onChange={(activeKey) => history.push(`${route.path}/${activeKey}`)}
			>
				<TabPane tab="Global" key="global">
					<Card withNegativeOffsetTop>
						<Section withBorder>
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
							<Hr.Base />
							<Form.Row
								label={'Company bank'}
								name={'company_bank'}
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
										placeholder={'Company bank'}
									/>
								)}
							</Form.Row>
							<Hr.Base />
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
						</Section>
					</Card>
				</TabPane>
				<TabPane tab="Web" key="web">
					<Card withNegativeOffsetTop>
						<Section title={'Forms'} withBorder>
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
						<Section title={'Language'} withBorder>
							<Form.Row
								label={'Language to install'}
								name={'language_installed'}
								control={control}
							>
								{(row) => (
									<LanguageInstaller
										installed={tmpState.language_installed}
										afterInstall={(value) => {
											row.onChange(value);
											setTmpState({ ...tmpState, language_installed: value });
										}}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Language default'}
								name={'language_default'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Radio.Group
										value={row.value}
										options={getLanguageDefaultOptions()}
										onChange={(e) => {
											row.onChange(e.target.value);
											setTmpState({
												...tmpState,
												language_default: e.target.value,
											});
										}}
										optionType="button"
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
									<Checkbox.Group
										value={row.value}
										options={getActiveLanguagesOptions()}
										onChange={(value) => {
											row.onChange(value);
											setTmpState({ ...tmpState, language_active: value });
										}}
									/>
								)}
							</Form.Row>
						</Section>
						<Section title={'Page meta'} withBorder>
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
						<Section title={'Page mode'} withBorder>
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
						<Section title={'Default pages'} withBorder>
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
						<Section title={'Comments'} withBorder>
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
								label={'Anonymous comments'}
								name={'comments_anonymous_active'}
								control={control}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
						</Section>
						<Section title={'Redactor approval'} withBorder>
							<Form.Row
								label={'Admin content approval'}
								name={'admin_content_approval'}
								control={control}
								helpText={
									'This allows chief-redactors approving content created by redactors, otherwise redactors can publish any content.'
								}
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
						{/* TODO: Installer for CRM / Market Module ... should be with form model ... */}
						<Section title={'Crm'} withBorder>
							<ModuleInstaller module={'Crm'} />
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
							<ModuleInstaller module={'Market'} />
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

export default SettingsForm;
