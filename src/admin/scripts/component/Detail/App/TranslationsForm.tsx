import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';
import styled from 'styled-components';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { TranslationsItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section } from '../../ui';
import LanguageToggle from '../../Language';
import CFG from '../../../../../config/global.json';
import { useTranslations, useSettings } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface TranslationsDetailFormProps {
	detailData: TranslationsItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const TranslationsDetailForm: React.FC<TranslationsDetailFormProps> = (
	props,
) => {
	const { t } = useTranslation(['common']);
	const { detailData, onCancel, onSave, onDelete } = props;
	const {
		updateTranslations,
		createTranslations,
		reloadTranslations,
	} = useTranslations();
	const { Settings } = useSettings();
	const [lang, setLang] = useState(CFG.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const { control, handleSubmit, formState, register, watch } = useForm({
		mode: 'onChange',
		defaultValues: {
			name: '',
			active: 1,
			lang: setLanguageModel(langList, {
				t_value: '',
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
			createTranslations(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateTranslations(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadTranslations(), SUBMIT_TIMEOUT);
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
						  t('model_item.Translations').toLowerCase()
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

					<Form.RowNoController label={'Language'}>
						{() => <LanguageToggle onChange={(lang) => setLang(lang)} />}
					</Form.RowNoController>
					<LanguageWrapper>
						{langList.map((lng) => (
							<LanguageWrapperPanel key={lng} isActive={lng == lang}>
								<Form.Row
									label={'Value'}
									name={`lang.${lng}.t_value`}
									control={control}
									rules={{ required: true }}
									defaultValue={''}
									required
								>
									{(row) => (
										<TextArea
											id={row.id}
											name={row.name}
											value={row.value}
											onChange={row.onChange}
											placeholder={'Value'}
											rows={3}
										/>
									)}
								</Form.Row>
							</LanguageWrapperPanel>
						))}
					</LanguageWrapper>
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

export default TranslationsDetailForm;
