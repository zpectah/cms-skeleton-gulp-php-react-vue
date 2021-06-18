import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch, Select } from 'antd';
import styled from 'styled-components';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { CategoriesItemProps } from '../../../App/types';
import { Modal, Form, Section, Wysiwyg } from '../../ui';
import Picker from '../../Picker';
import Manager from '../../Manager';
import LanguageToggle from '../../Language';
import { useCategories, useSettings } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';
import { string } from '../../../../../libs/js/utils';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface CategoriesDetailFormProps {
	detailData: CategoriesItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const CategoriesDetailForm: React.FC<CategoriesDetailFormProps> = ({
	detailData,
	onCancel,
	onSave,
	onDelete,
	allowSave,
	allowDelete,
}) => {
	const { t } = useTranslation(['common', 'types']);
	const {
		updateCategories,
		createCategories,
		reloadCategories,
	} = useCategories();
	const { Settings } = useSettings();
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			lang: setLanguageModel(langList, {
				title: '',
				perex: '',
				content: '',
			}),
			...detailData,
		},
	});

	useEffect(() => {
		if (Settings) setLangList(Settings.language_active);
	}, [Settings]);

	const submitHandler = (data) => {
		const master = {
			...data,
			name: string.replaceSpaces(data.name),
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
		<form>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Categories').toLowerCase()
						: detailData.name}
				</div>
			</Modal.Header>
			<Modal.Content>
				<Section.Base withBorder>
					<div>
						<input
							type="hidden"
							name="id"
							ref={register({ required: true })}
							defaultValue={detailData.id}
						/>
					</div>
					<Form.Row
						label={'Name'}
						name={'name'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.name || ''}
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
						defaultValue={detailData.type || 'default'}
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select type'}
							>
								{config.OPTIONS.model.Categories.type_list.map((item) => (
									<Select.Option value={item} key={item}>
										{t(`types:${item}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
					<Form.Row
						label={'Parent'}
						name={'parent'}
						control={control}
						defaultValue={detailData.parent || ''}
					>
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
									label={'Perex'}
									name={`lang.${lng}.perex`}
									control={control}
									defaultValue={''}
									long
								>
									{(row) => (
										<Input.TextArea
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
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Main image'}
						name={'img_main'}
						control={control}
						defaultValue={detailData.img_main || ''}
					>
						{(row) => (
							<>
								<Manager.Uploads
									type="image"
									selected={row.value}
									onChange={row.onChange}
									single
								/>
							</>
						)}
					</Form.Row>
					<Form.Row
						label={'Thumbnail'}
						name={'img_thumbnail'}
						control={control}
						defaultValue={detailData.img_thumbnail || ''}
					>
						{(row) => (
							<>
								<Manager.Uploads
									type="image"
									selected={row.value}
									onChange={row.onChange}
									single
								/>
							</>
						)}
					</Form.Row>
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
				invalid={!formState.isValid}
				detailData={detailData}
				allowSave={allowSave}
				allowDelete={allowDelete}
				onSubmit={handleSubmit(submitHandler)}
			/>
		</form>
	);
};

export default CategoriesDetailForm;
