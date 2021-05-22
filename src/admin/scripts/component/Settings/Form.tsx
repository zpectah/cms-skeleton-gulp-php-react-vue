import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { useForm } from 'react-hook-form';
import { Form as AntdForm, Input, Select, Switch, Checkbox, Alert } from 'antd';
import styled from 'styled-components';

import config from '../../config';
import { routeProps } from '../../types';
// import { EMAIL_REGEX } from '../../constants'; // TODO
import { Button, Form as UiForm, Card, Section, Hr } from '../ui';
import LanguageInstaller from './LanguageInstaller';
import ModuleInstaller from './ModuleInstaller';
import RepairSqlTables from './RepairSqlTables';
import ExportSqlDump from './ExportSqlDump';
import ImportSqlDump from './ImportSqlDump';

const ActionRow = styled.div`
	padding-top: 1rem;
`;

const TableWrapper = styled.div`
	width: 100%;
	height: auto;
	position: relative;
	overflow-y: auto;
`;
const StyledTable = styled.table`
	width: 100%;
	min-width: 700px;
	margin-bottom: 1rem;

	tr th,
	tr td {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
`;

interface SettingsFormProps {
	route: routeProps;
	panelKey?: string;
	loading?: boolean;
	model: any; // TODO ...
	onUpdate: Function;
}

const Form: React.FC<SettingsFormProps> = (props) => {
	const history = useHistory();
	const { t } = useTranslation(['common', 'component']);
	const { route, panelKey, model, loading, onUpdate } = props;
	const { control, handleSubmit, setValue, formState, reset } = useForm({
		mode: 'onChange',
		defaultValues: model,
	});
	const { TabPane } = Tabs;
	const { TextArea } = Input;
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
			// reset();
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

		return () => {};
	}, []);

	const submitHandler = (data) => onUpdate(data);

	const getLanguageDefaultOptions = () => {
		let na = [];

		tmpState.language_active.map((lang) => {
			na.push({
				label: config.LOCALES_LIST[lang].label,
				value: lang,
			});
		});

		return na;
	};

	const getActiveLanguagesOptions = () => {
		let na = [];

		tmpState.language_installed.map((lang) => {
			na.push({
				label: config.LOCALES_LIST[lang].label,
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
					<Card.Base withNegativeOffsetTop>
						<Section.Base title={'Project'} withBorder>
							<UiForm.Row
								label={'Name'}
								name={'project_name'}
								control={control}
								rules={{ required: true }}
								helpText={'This is for internal purpose only'}
								required
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
							</UiForm.Row>
						</Section.Base>
						<Section.Base title={'Company (owner)'} titleAnchor={'company'}>
							<UiForm.Row label={'ID'} name={'company_id'} control={control}>
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
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={'Name'}
								name={'company_name'}
								control={control}
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
							</UiForm.Row>
							<UiForm.Row
								label={'Description'}
								name={'company_description'}
								control={control}
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
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={'Address'}
								name={'company_address'}
								control={control}
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
							</UiForm.Row>
							<UiForm.Row
								label={'City'}
								name={'company_city'}
								control={control}
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
							</UiForm.Row>
							<UiForm.Row
								label={'Country'}
								name={'company_country'}
								control={control}
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
							</UiForm.Row>
							<UiForm.Row
								label={'Zip code'}
								name={'company_zip'}
								control={control}
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
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={'E-mail'}
								name={'company_email'}
								control={control}
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
							</UiForm.Row>
							<UiForm.Row
								label={'Phone'}
								name={'company_phone'}
								control={control}
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
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={'Bank'}
								name={'company_bank'}
								control={control}
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
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={'Location'}
								name={'company_location'}
								control={control}
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
							</UiForm.Row>
						</Section.Base>
					</Card.Base>
				</TabPane>
				<TabPane tab="Web" key="web">
					<Card.Base withNegativeOffsetTop>
						<Section.Base title={'Page meta'} titleAnchor={'meta'} withBorder>
							<UiForm.Row
								label={'Title'}
								name={'meta_title'}
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
										placeholder={'Page meta title'}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={'Description'}
								name={'meta_description'}
								control={control}
								rules={{ required: true }}
								required
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
							</UiForm.Row>
							<UiForm.Row
								label={'Robots'}
								name={'meta_robots'}
								control={control}
								rules={{ required: true }}
								required
							>
								{(row) => (
									<Select
										id={row.id}
										style={{ width: '100%' }}
										options={config.OPTIONS.meta.robots}
										value={row.value}
										onChange={row.onChange}
										placeholder={'Page meta robots'}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
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
							</UiForm.Row>
						</Section.Base>
						<Section.Base title={'Page mode'} titleAnchor={'mode'} withBorder>
							<UiForm.Row
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
							</UiForm.Row>
							<UiForm.Row
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
							</UiForm.Row>
							<UiForm.Row
								label={'In development'}
								name={'mode_development'}
								control={control}
								helpText={'If page is in development mode'}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</UiForm.Row>
						</Section.Base>
						<Section.Base
							title={'Language'}
							titleAnchor={'language'}
							description={
								'This is for showing content with more language mutations. Installing new language is irreversible step and wont be uninstalled, only disabled.'
							}
							withBorder
						>
							<UiForm.Row
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
							</UiForm.Row>
							<UiForm.Row
								label={'Active languages'}
								name={'language_active'}
								control={control}
								rules={{ required: true }}
								required
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
							</UiForm.Row>
							<UiForm.Row
								label={'Default language'}
								name={'language_default'}
								control={control}
								rules={{ required: true }}
								required
							>
								{(row) => (
									<Select
										style={{ width: '100%' }}
										id={row.id}
										value={row.value}
										onChange={(value) => {
											row.onChange(value);
											setTmpState({
												...tmpState,
												language_default: value,
											});
										}}
										options={getLanguageDefaultOptions()}
										placeholder={'Select default language'}
									/>
								)}
							</UiForm.Row>
						</Section.Base>
						<Section.Base title={'Forms'} withBorder>
							<UiForm.Row
								label={'Sender email'}
								name={'form_sender_email'}
								control={control}
								rules={{ required: true }}
								helpText={
									'This email will be displayed in the header of the email message as the sender'
								}
								required
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
							</UiForm.Row>
							<UiForm.Row
								label={'Recipients email'}
								name={'form_recipients_email'}
								control={control}
								rules={{ required: true }}
								helpText={'Forms messages will be sent to these emails'}
								required
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
							</UiForm.Row>
						</Section.Base>
						<Section.Base
							title={'Approval'}
							titleAnchor={'approval'}
							withBorder={tmpState.module_members_installed}
						>
							<UiForm.Row
								label={'Redactor approval'}
								name={'redactor_content_approval'}
								control={control}
								helpText={
									'This allows chief-redactors approving content created by redactors, otherwise redactors can publish any content.'
								}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</UiForm.Row>
						</Section.Base>
						{tmpState.module_members_installed && (
							<Section.Base title={'Comments'} titleAnchor={'comments'}>
								<UiForm.Row
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
								</UiForm.Row>
								<UiForm.Row
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
								</UiForm.Row>
							</Section.Base>
						)}
					</Card.Base>
				</TabPane>
				<TabPane tab="Modules" key="modules">
					<Card.Base withNegativeOffsetTop>
						<Section.Base title={'Members'} titleAnchor={'members'} withBorder>
							{tmpState.module_members_installed ? (
								<>
									<UiForm.Row
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
									</UiForm.Row>
									{tmpState.module_members_active && (
										<>
											<Hr.Base />
											<UiForm.Row
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
											</UiForm.Row>
											<UiForm.Row
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
											</UiForm.Row>
											<UiForm.Row
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
											</UiForm.Row>
										</>
									)}
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
						</Section.Base>
						<Section.Base title={'Crm'} titleAnchor={'crm'} withBorder>
							{tmpState.module_crm_installed ? (
								<>
									<UiForm.Row
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
									</UiForm.Row>
									{tmpState.module_crm_active && (
										<>
											<Hr.Base />
											... form part available only when module is active ...
										</>
									)}
								</>
							) : (
								<>
									<ModuleInstaller
										module={'Crm'}
										afterInstall={() => {
											console.log('Module is CRM installed');
											setTmpState({
												...tmpState,
												module_crm_installed: true, // TODO
											});
										}}
										disabled={!tmpState.module_members_installed}
									/>
									{!tmpState.module_members_installed && (
										<Alert
											message="You need to have the Members module installed"
											type="warning"
										/>
									)}
								</>
							)}
						</Section.Base>
						<Section.Base title={'Market'} titleAnchor={'market'}>
							{tmpState.module_market_installed ? (
								<>
									<UiForm.Row
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
									</UiForm.Row>
									{tmpState.module_market_active && (
										<>
											<Hr.Base />
											... form part available only when module is active ...
										</>
									)}
								</>
							) : (
								<>
									<ModuleInstaller
										module={'Market'}
										afterInstall={() => {
											console.log('Module CRM installed');
											setTmpState({
												...tmpState,
												module_market_installed: true, // TODO
											});
										}}
										disabled={!tmpState.module_members_installed}
									/>
									{!tmpState.module_members_installed && (
										<Alert
											message="You need to have the Members module installed"
											type="warning"
										/>
									)}
								</>
							)}
						</Section.Base>
					</Card.Base>
				</TabPane>
				<TabPane tab="Maintenance" key="maintenance">
					<Card.Base withNegativeOffsetTop>
						<Section.Base title={'Repairs'} titleAnchor={'repairs'}>
							<TableWrapper>
								<StyledTable>
									<tbody>
										<RepairSqlTables />
										<ExportSqlDump />
										<ImportSqlDump />
									</tbody>
								</StyledTable>
							</TableWrapper>
						</Section.Base>
					</Card.Base>
				</TabPane>
			</Tabs>
			<ActionRow>
				<Button.Base
					type={'primary'}
					htmlType={'submit'}
					loading={loading}
					disabled={!formState.isValid}
				>
					{t('component:form.btn.update_changes')}
				</Button.Base>
			</ActionRow>
		</AntdForm>
	);
};

export default Form;
