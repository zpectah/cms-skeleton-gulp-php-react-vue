import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch, Select } from 'antd';
import styled from 'styled-components';

import OPTIONS from '../../../../../config/options.json';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { CategoriesItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section, Picker, Wysiwyg } from '../../ui';
import LanguageToggle from '../../LanguageToggle';
import CFG from '../../../../../config/global.json';
import { useCategories, useSettings, useProfile } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface CategoriesDetailFormProps {
	detailData: CategoriesItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const CategoriesDetailForm: React.FC<CategoriesDetailFormProps> = (props) => {
	const { t } = useTranslation(['common']);
	const { detailData, onCancel, onSave, onDelete } = props;
	const {
		updateCategories,
		createCategories,
		reloadCategories,
	} = useCategories();
	const { Settings } = useSettings();
	const [lang, setLang] = useState(CFG.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			type: 'default',
			name: '',
			parent: '',
			img_main: '', // TODO
			img_thumbnail: '', // TODO
			active: 1,
			lang: setLanguageModel(langList, {
				title: '',
				perex: '',
				content: '',
			}),
			...detailData,
		},
	});
	const { TextArea } = Input;

	useEffect(() => {
		if (Settings) setLangList(Settings.language_active);
	}, [Settings]);

	const submitHandler = (data) => {
		const master = {
			...data,
		};

		if (detailData.is_new) {
			createCategories(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateCategories(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadCategories(), SUBMIT_TIMEOUT);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<input
				type="hidden"
				name="id"
				ref={register({ required: true })}
				defaultValue={detailData.id}
			/>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Categories').toLowerCase()
						: detailData.name}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<Form.Row
						label={'Name'}
						name={'name'}
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
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select type'}
								options={OPTIONS.model.Categories.type}
							/>
						)}
					</Form.Row>
					<Form.Row label={'Parent'} name={'parent'} control={control}>
						{(row) => (
							<Picker.Categories
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								ignoredId={detailData.id !== 'new' && [detailData.id]}
								single
							/>
						)}
					</Form.Row>
					<Form.Row name={'id'} control={control} blankLabel>
						{() => <LanguageToggle onChange={(lang) => setLang(lang)} />}
					</Form.Row>
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
									label={'Perex'}
									name={`lang.${lng}.perex`}
									control={control}
									defaultValue={''}
									long
								>
									{(row) => (
										<TextArea
											id={row.id}
											name={row.name}
											value={row.value}
											onChange={row.onChange}
											placeholder={'Perex'}
											rows={5}
										/>
									)}
								</Form.Row>
								<Form.Row
									label={'Content'}
									name={`lang.${lng}.content`}
									control={control}
									long
								>
									{(row) => (
										<Wysiwyg.Base
											value={row.value}
											onChange={row.onChange}
											placeholder={'Content'}
										/>
									)}
								</Form.Row>
							</LanguageWrapperPanel>
						))}
					</LanguageWrapper>
					<Form.Row label={'Main image'} name={'img_main'} control={control}>
						{(row) => (
							<>
								<Picker.Media value={row.value} onChange={row.onChange} />
								{/*
								<Input
									id={row.id}
									type={'text'}
									name={row.name}
									value={row.value}
									onChange={row.onChange}
									placeholder={'img_main'}
								/>
								*/}
							</>
						)}
					</Form.Row>
					<Form.Row
						label={'Thumbnail'}
						name={'img_thumbnail'}
						control={control}
					>
						{(row) => (
							<>
								<Picker.Media value={row.value} onChange={row.onChange} />
								{/*
								<Input
									id={row.id}
									type={'text'}
									name={row.name}
									value={row.value}
									onChange={row.onChange}
									placeholder={'img_thumbnail'}
								/>
								*/}
							</>
						)}
					</Form.Row>
					<Form.Row label={'Active'} name={'active'} control={control}>
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
				invalid={!formState.isValid}
				detailData={detailData}
			/>
		</form>
	);
};

export default CategoriesDetailForm;
