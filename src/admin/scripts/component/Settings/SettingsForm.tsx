import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import {
	Form as AntdForm,
	Input,
	Select,
	Switch,
	Checkbox,
	Radio,
	Alert,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import NUMS from '../../../../config/nums.json';
import OPTIONS from '../../../../config/options.json';
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
	onUpdate: Function;
}

const SettingsForm: React.FC<SettingsFormProps> = (props) => {
	const history = useHistory();
	const { route, panelKey, model, loading, onUpdate } = props;
	const {
		control,
		handleSubmit,
		formState,
		setValue,
		getValues,
		reset,
	} = useForm({
		mode: 'onChange',
		defaultValues: model,
	});
	const { TabPane } = Tabs;
	const { TextArea } = Input;
	const [updating, setUpdating] = useState<boolean>(false);
	const [tmpState, setTmpState] = useState<{
		language_installed: string[];
		language_active: any;
		language_default: string;
		module_crm_installed: boolean;
		module_crm_active: boolean;
		module_market_installed: boolean;
		module_market_active: boolean;
		module_members_active: boolean;
		module_members_installed: boolean;
	}>({
		language_installed: [],
		language_active: [],
		language_default: null,
		module_crm_installed: false,
		module_crm_active: false,
		module_market_installed: false,
		module_market_active: false,
		module_members_active: false,
		module_members_installed: false,
	});

	useEffect(() => {
		if (model) {
			Object.entries(model).forEach(([key, value]) => {
				setValue(key, value);
			});

			setTmpState({
				language_installed: model.language_installed,
				language_active: model.language_active,
				language_default: model.language_default,
				module_crm_installed: model.module_crm_installed,
				module_crm_active: model.module_crm_active,
				module_market_installed: model.module_market_installed,
				module_market_active: model.module_market_active,
				module_members_active: model.module_members_active,
				module_members_installed: model.module_members_installed,
			});
		}
	}, [model]);

	const submitHandler = (data) => onUpdate(data);

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
								helpText={'This is name only for internal purpose'}
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
						<Section title={'Company'} titleAnchor={'company'}>
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
							<Hr.Base />
							<Form.Row
								label={'Name'}
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
								label={'Description'}
								name={'company_description'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<TextArea
										id={row.id}
										rows={5}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company description'}
									/>
								)}
							</Form.Row>
							<Hr.Base />
							<Form.Row
								label={'Address'}
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
								label={'City'}
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
								label={'Country'}
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
								label={'Zip code'}
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
							<Hr.Base />
							<Form.Row
								label={'E-mail'}
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
								label={'Phone'}
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
								label={'Bank'}
								name={'company_bank'}
								control={control}
								rules={{ required: true }}
								helpText={'This information are optional'}
							>
								{(row) => (
									<TextArea
										id={row.id}
										rows={3}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Company bank object'}
									/>
								)}
							</Form.Row>
							<Hr.Base />
							<Form.Row
								label={'Location'}
								name={'company_location'}
								control={control}
								rules={{ required: true }}
								helpText={'This information are optional'}
							>
								{(row) => (
									<TextArea
										id={row.id}
										rows={3}
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
								label={'Sender email'}
								name={'form_sender_email'}
								control={control}
								rules={{ required: true }}
								helpText={
									'This email will be displayed in the header of the email message as the sender'
								}
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
								label={'Recipients email'}
								name={'form_recipients_email'}
								control={control}
								rules={{ required: true }}
								helpText={'Forms messages will be sent to these emails'}
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
						<Section title={'Language'} titleAnchor={'language'} withBorder>
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
						</Section>
						<Section title={'Page header meta'} titleAnchor={'meta'} withBorder>
							<Form.Row
								label={'Title'}
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
								label={'Description'}
								name={'meta_description'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<TextArea
										id={row.id}
										rows={3}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page meta description'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Robots'}
								name={'meta_robots'}
								control={control}
								rules={{ required: true }}
							>
								{(row) => (
									<Select
										id={row.id}
										style={{ width: '100%' }}
										options={OPTIONS.meta.robots}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page meta robots'}
									/>
								)}
							</Form.Row>
							<Form.Row
								label={'Keywords'}
								name={'meta_keywords'}
								control={control}
							>
								{(row) => (
									<Select
										mode="tags"
										id={row.id}
										style={{ width: '100%' }}
										placeholder={'Page meta keywords'}
										value={row.value}
										onChange={row.onChange}
									/>
								)}
							</Form.Row>
						</Section>
						<Section title={'Page mode'} titleAnchor={'mode'} withBorder>
							<Form.Row
								label={'In maintenance'}
								name={'mode_maintenance'}
								control={control}
								helpText={
									'If page is in maintenance mode and some features should be disabled'
								}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'In debug'}
								name={'mode_debug'}
								control={control}
								helpText={
									'If page is in debug mode and some features should be disabled'
								}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
							<Form.Row
								label={'In development'}
								name={'mode_development'}
								control={control}
								helpText={'If page is in development mode'}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</Form.Row>
						</Section>
						<Section title={'Approval'} titleAnchor={'approval'} withBorder>
							<Form.Row
								label={'Admin approval'}
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
						{tmpState.module_members_installed && (
							<Section title={'Comments'} titleAnchor={'comments'}>
								<Form.Row
									label={'Active'}
									name={'comments_global_active'}
									control={control}
									helpText={'If comments are active in global'}
								>
									{(row) => (
										<Switch
											checked={row.value}
											onChange={row.onChange}
											disabled={!tmpState.module_members_active}
										/>
									)}
								</Form.Row>
								<Form.Row
									label={'Anonymous'}
									name={'comments_anonymous_active'}
									control={control}
									helpText={'Anonymous members should comment content'}
								>
									{(row) => (
										<Switch
											checked={row.value}
											onChange={row.onChange}
											disabled={!tmpState.module_members_active}
										/>
									)}
								</Form.Row>
							</Section>
						)}
					</Card>
				</TabPane>
				<TabPane tab="Module" key="module">
					<Card withNegativeOffsetTop>
						<Section title={'Members'} titleAnchor={'members'} withBorder>
							{tmpState.module_members_installed ? (
								<>
									<Form.Row
										label={'Members active'}
										name={'module_members_active'}
										control={control}
									>
										{(row) => (
											<Switch
												checked={row.value}
												onChange={(checked) => {
													row.onChange(checked);
													setTmpState({
														...tmpState,
														module_members_active: checked,
													});
												}}
											/>
										)}
									</Form.Row>
									<Hr.Base />
									<Form.Row
										label={'Register active'}
										name={'members_register_active'}
										control={control}
										helpText={'Page and form with registration for members'}
									>
										{(row) => (
											<Switch
												checked={row.value}
												onChange={row.onChange}
												disabled={!tmpState.module_members_active}
											/>
										)}
									</Form.Row>
									<Form.Row
										label={'Login active'}
										name={'members_login_active'}
										control={control}
										helpText={'Page and form with member login'}
									>
										{(row) => (
											<Switch
												checked={row.value}
												onChange={row.onChange}
												disabled={!tmpState.module_members_active}
											/>
										)}
									</Form.Row>
									<Form.Row
										label={'Lost password active'}
										name={'members_lostPassword_active'}
										control={control}
										helpText={'Page and form with lost password'}
									>
										{(row) => (
											<Switch
												checked={row.value}
												onChange={row.onChange}
												disabled={!tmpState.module_members_active}
											/>
										)}
									</Form.Row>
								</>
							) : (
								<ModuleInstaller
									module={'Members'}
									afterInstall={() => {
										console.log('Members is Members installed');
										setTmpState({
											...tmpState,
											module_members_installed: true, // TODO
										});
									}}
								/>
							)}
						</Section>
						<Section title={'Crm'} titleAnchor={'crm'} withBorder>
							{tmpState.module_crm_installed ? (
								<>
									<Form.Row
										label={'CRM active'}
										name={'module_crm_active'}
										control={control}
									>
										{(row) => (
											<Switch
												checked={row.value}
												onChange={(checked) => {
													row.onChange(checked);
													setTmpState({
														...tmpState,
														module_crm_active: checked,
													});
												}}
											/>
										)}
									</Form.Row>
								</>
							) : (
								<ModuleInstaller
									module={'Crm'}
									afterInstall={() => {
										console.log('Module is CRM installed');
										setTmpState({
											...tmpState,
											module_crm_installed: true, // TODO
										});
									}}
								/>
							)}
						</Section>
						<Section title={'Market'} titleAnchor={'market'}>
							{tmpState.module_market_installed ? (
								<>
									<Form.Row
										label={'Market active'}
										name={'module_market_active'}
										control={control}
									>
										{(row) => (
											<Switch
												checked={row.value}
												onChange={(checked) => {
													row.onChange(checked);
													setTmpState({
														...tmpState,
														module_market_active: checked,
													});
												}}
											/>
										)}
									</Form.Row>
								</>
							) : (
								<ModuleInstaller
									module={'Market'}
									afterInstall={() => {
										console.log('Module CRM installed');
										setTmpState({
											...tmpState,
											module_market_installed: true, // TODO
										});
									}}
								/>
							)}
						</Section>
					</Card>
				</TabPane>
			</Tabs>
			<ActionRow>
				<Button.Base type={'primary'} htmlType={'submit'} loading={updating}>
					Update changes
				</Button.Base>
			</ActionRow>
		</AntdForm>
	);
};

export default SettingsForm;
