import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch, Select } from 'antd';
import styled from 'styled-components';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { PagesItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section, Wysiwyg } from '../../ui';
import Picker from '../../Picker';
import LanguageToggle from '../../Language';
import { usePages, useSettings } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';
import { string } from '../../../../../libs/js/utils';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface PagesDetailFormProps {
	detailData: PagesItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const PagesDetailForm: React.FC<PagesDetailFormProps> = (props) => {
	const { t } = useTranslation(['common', 'types']);
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { Pages, updatePages, createPages, reloadPages } = usePages();
	const { Settings } = useSettings();
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const {
		control,
		handleSubmit,
		formState,
		register,
		watch,
		setValue,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			lang: setLanguageModel(langList, {
				title: '',
				content: '',
			}),
			...detailData,
		},
	});
	const [duplicates, setDuplicates] = useState(false);

	useEffect(() => {
		if (Settings) setLangList(Settings.language_active);
	}, [Settings]);

	const submitHandler = (data) => {
		const master = {
			...data,
			name: string.replaceSpaces(data.name),
		};

		if (detailData.is_new) {
			createPages(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updatePages(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadPages(), SUBMIT_TIMEOUT);
	};

	const watchType = watch('type');

	const isDuplicate = (name) => {
		let duplicate = false;
		Pages?.map((item) => {
			if (item.name == name) duplicate = true;
		});

		setDuplicates(duplicate);

		return duplicate;
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<div>
				<input
					type="hidden"
					name="id"
					ref={register({ required: true })}
					defaultValue={detailData.id}
				/>
				{!(
					watchType == 'category' ||
					watchType == 'tags' ||
					watchType == 'system'
				) && (
					<input
						type="hidden"
						name="type_id"
						ref={register({})}
						defaultValue={detailData.type_id}
					/>
				)}
			</div>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') + ' ' + t('model_item.Pages').toLowerCase()
						: detailData.name}
				</div>
			</Modal.Header>
			<Modal.Content>
				<Section.Base withBorder>
					<Form.Row
						label={'Name'}
						name={'name'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.name || ''}
						errors={duplicates ? ['This name is already in use'] : []}
						helpText={'This name is used as part of url address.'}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={(e) => {
									row.onChange(e.target.value);
									if (e.target.value.length > 2) isDuplicate(e.target.value);
								}}
								placeholder={'Name'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Type'}
						name={'type'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.type || 'default'}
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={(value) => {
									setValue('type_id', '');
									row.onChange(value);
								}}
								placeholder={'Select type'}
							>
								{config.OPTIONS.model.Pages.type_list.map((item) => (
									<Select.Option value={item} key={item}>
										{t(`types:${item}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
					{watchType == 'category' && (
						<Form.Row
							label={'Category'}
							name={'type_id'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.type_id || ''}
						>
							{(row) => (
								<Picker.Categories
									value={row.value}
									onChange={row.onChange}
									single
								/>
							)}
						</Form.Row>
					)}
					{watchType == 'tags' && (
						<Form.Row
							label={'Tags'}
							name={'type_id'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.type_id || ''}
						>
							{(row) => (
								<Picker.Tags value={row.value} onChange={row.onChange} single />
							)}
						</Form.Row>
					)}
					{watchType == 'system' && (
						<Form.Row
							label={'System'}
							name={'type_id'}
							control={control}
							rules={{ required: true }}
							required
							defaultValue={detailData.type_id || ''}
						>
							{(row) => (
								<Select
									style={{ width: '100%' }}
									id={row.id}
									value={row.value}
									onChange={row.onChange}
									placeholder={'Select type'}
								>
									<Select.Option value={''} key={0} disabled>
										{'Select type'}
									</Select.Option>
									{config.OPTIONS.model.Pages.system_types.map((item) => (
										<Select.Option value={item} key={item}>
											{t(`types:${item}`)}
										</Select.Option>
									))}
								</Select>
							)}
						</Form.Row>
					)}
				</Section.Base>
				<Section.Base withBorder>
					<Form.RowNoController label={'Language'}>
						{() => <LanguageToggle onChange={(lang) => setLang(lang)} />}
					</Form.RowNoController>
					<LanguageWrapper>
						{langList.map((lng) => (
							<LanguageWrapperPanel key={lng} isActive={lng == lang}>
								<Form.Row
									label={'Title'}
									name={`lang.${lng}.title`}
									control={control}
									rules={{ required: true }}
									defaultValue={''}
									required
								>
									{(row) => (
										<Input
											id={row.id}
											type={'text'}
											name={row.name}
											value={row.value}
											onChange={row.onChange}
											placeholder={'Title'}
										/>
									)}
								</Form.Row>
								<Form.Row
									label={'Content'}
									name={`lang.${lng}.content`}
									control={control}
									rules={{ required: true }}
									required
									long
								>
									{(row) => (
										<Wysiwyg.Base
											value={row.value}
											onChange={row.onChange}
											placeholder={'Content'}
											forPage
										/>
									)}
								</Form.Row>
							</LanguageWrapperPanel>
						))}
					</LanguageWrapper>
				</Section.Base>
				<Section.Base>
					<Form.Row
						label={'Active'}
						name={'active'}
						control={control}
						defaultValue={detailData.active || true}
					>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
				</Section.Base>
			</Modal.Content>
			<DetailFooter
				onCancel={onCancel}
				onDelete={onDelete}
				isNew={detailData.is_new}
				invalid={!formState.isValid && !duplicates}
				detailData={detailData}
				allowSave={allowSave}
				allowDelete={allowDelete}
			/>
		</form>
	);
};

export default PagesDetailForm;
