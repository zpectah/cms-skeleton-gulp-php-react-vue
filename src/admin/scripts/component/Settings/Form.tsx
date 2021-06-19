import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
	Form as AntdForm,
	Input,
	Select,
	Switch,
	Checkbox,
	Alert,
	Tabs,
} from 'antd';
import styled from 'styled-components';

import config from '../../config';
import { routeProps } from '../../types';
import { EMAIL_REGEX } from '../../constants';
import { Button, Form as UiForm, Card, Section, Hr } from '../ui';
import Manager from '../Manager';
import LanguageInstaller from './LanguageInstaller';
import ModuleInstaller from './ModuleInstaller';
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
	const { t } = useTranslation(['common', 'component', 'types']);
	const { route, panelKey, model, loading, onUpdate } = props;
	const { control, handleSubmit, setValue, formState, reset } = useForm({
		mode: 'all',
		defaultValues: model,
	});
	const { TabPane } = Tabs;
	const { TextArea } = Input;
	const [tmpState, setTmpState] = useState<{
		language_installed: string[];
		language_active: any;
		language_default: string;
		module_market_installed: boolean;
		module_market_active: boolean;
		module_members_active: boolean;
		module_members_installed: boolean;
	}>({
		language_installed: [],
		language_active: [],
		language_default: null,
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
		<AntdForm>
			<Tabs
				defaultActiveKey={panelKey ? panelKey : 'global'}
				onChange={(activeKey) => history.push(`${route.path}/${activeKey}`)}
			>
				<TabPane tab={t('component:Settings.global.title')} key="global">
					<Card.Base withNegativeOffsetTop>
						<Section.Base
							title={t('component:Settings.global.section.project')}
							withBorder
						>
							<UiForm.Row
								label={t('input.projectName.label')}
								name={'project_name'}
								control={control}
								rules={{ required: true }}
								helpText={t('component:Settings.global.nameHelp')}
								required
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={t('input.projectName.placeholder')}
									/>
								)}
							</UiForm.Row>
						</Section.Base>
						<Section.Base
							title={t('component:Settings.global.section.company')}
							titleAnchor={'company'}
						>
							<UiForm.Row
								label={t('input.companyId.label')}
								name={'company_id'}
								control={control}
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={t('input.companyId.label')}
									/>
								)}
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={t('input.name.label')}
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
										placeholder={t('input.name.placeholder')}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.description.label')}
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
										placeholder={t('input.description.placeholder')}
									/>
								)}
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={t('input.address.label')}
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
										placeholder={t('input.address.placeholder')}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.city.label')}
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
										placeholder={t('input.city.placeholder')}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.country.label')}
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
										placeholder={t('input.country.placeholder')}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.zip.label')}
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
										placeholder={t('input.zip.placeholder')}
									/>
								)}
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={t('input.email.label')}
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
										placeholder={t('input.email.placeholder')}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.phone.label')}
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
										placeholder={t('input.phone.placeholder')}
									/>
								)}
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={t('input.bank.label')}
								name={'company_bank'}
								control={control}
								helpText={t('component:Settings.global.bankHelp')}
							>
								{(row) => (
									<TextArea
										id={row.id}
										rows={3}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={t('input.bank.placeholder')}
									/>
								)}
							</UiForm.Row>
							<Hr.Base />
							<UiForm.Row
								label={t('input.location.label')}
								name={'company_location'}
								control={control}
							>
								{(row) => (
									<Manager.Location value={row.value} onChange={row.onChange} />
								)}
							</UiForm.Row>
						</Section.Base>
					</Card.Base>
				</TabPane>
				<TabPane tab={t('component:Settings.web.title')} key="web">
					<Card.Base withNegativeOffsetTop>
						<Section.Base
							title={t('component:Settings.web.section.meta')}
							titleAnchor={'meta'}
							withBorder
						>
							<UiForm.Row
								label={t('input.pageTitle.label')}
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
										placeholder={t('input.pageTitle.placeholder')}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.description.label')}
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
										placeholder={t('input.description.placeholder')}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.robots.label')}
								name={'meta_robots'}
								control={control}
								rules={{ required: true }}
								required
							>
								{(row) => (
									<Select
										id={row.id}
										style={{ width: '100%' }}
										value={row.value}
										onChange={row.onChange}
										placeholder={t('input.robots.placeholder')}
									>
										{config.OPTIONS.meta.robots.map((item) => (
											<Select.Option value={item} key={item}>
												{t(`types:${item}`)}
											</Select.Option>
										))}
									</Select>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.keywords.label')}
								name={'meta_keywords'}
								control={control}
							>
								{(row) => (
									<Select
										mode="tags"
										id={row.id}
										style={{ width: '100%' }}
										placeholder={t('input.keywords.placeholder')}
										value={row.value}
										onChange={row.onChange}
									/>
								)}
							</UiForm.Row>
						</Section.Base>
						<Section.Base
							title={t('component:Settings.web.section.mode')}
							titleAnchor={'mode'}
							withBorder
						>
							<UiForm.Row
								label={t('input.inMaintenance.label')}
								name={'mode_maintenance'}
								control={control}
								helpText={t('component:Settings.web.inMaintenanceHelp')}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.inDebug.label')}
								name={'mode_debug'}
								control={control}
								helpText={t('component:Settings.web.inDebugHelp')}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.inDevelopment.label')}
								name={'mode_development'}
								control={control}
								helpText={t('component:Settings.web.inDevelopmentHelp')}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</UiForm.Row>
						</Section.Base>
						<Section.Base
							title={t('component:Settings.web.section.language')}
							titleAnchor={'language'}
							description={t(
								'component:Settings.web.section.languageDescription',
							)}
							withBorder
						>
							<UiForm.Row
								label={t('input.languageToInstall.label')}
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
								label={t('input.activeLanguages.label')}
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
								label={t('input.defaultLanguage.label')}
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
										placeholder={t('input.defaultLanguage.placeholder')}
									/>
								)}
							</UiForm.Row>
						</Section.Base>
						<Section.Base
							title={t('component:Settings.web.section.forms')}
							withBorder
						>
							<UiForm.Row
								label={t('input.senderEmail.label')}
								name={'form_sender_email'}
								control={control}
								rules={{ required: true, pattern: EMAIL_REGEX }}
								helpText={t('component:Settings.web.senderEmailHelp')}
								required
							>
								{(row) => (
									<Input
										id={row.id}
										type={'text'}
										name={row.name}
										value={row.value}
										onChange={row.onChange}
										placeholder={t('input.senderEmail.placeholder')}
									/>
								)}
							</UiForm.Row>
							<UiForm.Row
								label={t('input.recipientsEmail.label')}
								name={'form_recipients_email'}
								control={control}
								rules={{ required: true }}
								helpText={t('component:Settings.web.recipientsHelp')}
								required
							>
								{(row) => (
									<Select
										mode="tags"
										style={{ width: '100%' }}
										id={row.id}
										value={row.value}
										onChange={row.onChange}
										placeholder={t('input.recipientsEmail.placeholder')}
									/>
								)}
							</UiForm.Row>
						</Section.Base>
						<Section.Base
							title={t('component:Settings.web.section.approval')}
							titleAnchor={'approval'}
							withBorder={tmpState.module_members_installed}
						>
							<UiForm.Row
								label={t('input.redactorApproval.label')}
								name={'redactor_content_approval'}
								control={control}
								helpText={t('component:Settings.web.redactorApprovalHelp')}
							>
								{(row) => (
									<Switch checked={row.value} onChange={row.onChange} />
								)}
							</UiForm.Row>
						</Section.Base>
						{tmpState.module_members_installed && (
							<Section.Base
								title={t('component:Settings.web.section.comments')}
								titleAnchor={'comments'}
							>
								<UiForm.Row
									label={t('input.active.label')}
									name={'comments_global_active'}
									control={control}
									helpText={t('component:Settings.web.commentsActiveHelp')}
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
									label={t('input.anonymous.label')}
									name={'comments_anonymous_active'}
									control={control}
									helpText={t('component:Settings.web.commentsAnonymousHelp')}
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
				<TabPane tab={t('component:Settings.modules.title')} key="modules">
					<Card.Base withNegativeOffsetTop>
						<Section.Base
							title={t('component:Settings.modules.section.members')}
							titleAnchor={'members'}
							withBorder
						>
							{tmpState.module_members_installed ? (
								<>
									<UiForm.Row
										label={t('input.membersActive.label')}
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
												label={t('input.registerActive.label')}
												name={'members_register_active'}
												control={control}
												helpText={t(
													'component:Settings.modules.memberRegisterHelp',
												)}
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
												label={t('input.loginActive.label')}
												name={'members_login_active'}
												control={control}
												helpText={t(
													'component:Settings.modules.memberLoginHelp',
												)}
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
												label={t('input.lostPasswordActive.label')}
												name={'members_lostPassword_active'}
												control={control}
												helpText={t(
													'component:Settings.modules.memberLostPasswordHelp',
												)}
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
										setTmpState({
											...tmpState,
											module_members_installed: true,
										});
									}}
								/>
							)}
						</Section.Base>
						<Section.Base
							title={t('component:Settings.modules.section.market')}
							titleAnchor={'market'}
						>
							{tmpState.module_market_installed ? (
								<>
									<UiForm.Row
										label={t('input.marketActive.label')}
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
									{tmpState.module_market_active && <></>}
								</>
							) : (
								<>
									<ModuleInstaller
										module={'Market'}
										afterInstall={() => {
											setTmpState({
												...tmpState,
												module_market_installed: true,
											});
										}}
										disabled={!tmpState.module_members_installed}
									/>
									{!tmpState.module_members_installed && (
										<Alert
											message={t('component:Settings.modules.membersAlert')}
											type="warning"
										/>
									)}
								</>
							)}
						</Section.Base>
					</Card.Base>
				</TabPane>
				<TabPane
					tab={t('component:Settings.maintenance.title')}
					key="maintenance"
				>
					<Card.Base withNegativeOffsetTop>
						<Section.Base
							title={t('component:Settings.maintenance.section.export')}
							titleAnchor={'export'}
						>
							<TableWrapper>
								<StyledTable>
									<tbody>
										<ExportSqlDump />
										{config.GLOBAL.CMS.USE_IMPORT_SQL && <ImportSqlDump />}
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
					onClick={handleSubmit(submitHandler)}
					loading={loading}
					disabled={!formState.isValid}
				>
					{t('btn.updateChanges')}
				</Button.Base>
			</ActionRow>
		</AntdForm>
	);
};

export default Form;
