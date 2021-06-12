import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Rate, Select, Switch } from 'antd';
import styled from 'styled-components';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useStores } from '../../../Market/hooks';
import { StoresItemProps } from '../../../Market/types';
import { Modal, Typography, Form, Section, Wysiwyg } from '../../ui';
import DetailFooter from '../DetailFooter';
import { string } from '../../../../../libs/js/utils';
import config from '../../../config';
import LanguageToggle from '../../Language';
import setLanguageModel from '../setLanguageModel';
import Manager from '../../Manager';
import { useSettings } from '../../../App/hooks';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface StoresDetailFormProps {
	detailData: StoresItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const StoresDetailForm: React.FC<StoresDetailFormProps> = (props) => {
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { t } = useTranslation(['common']);
	const { updateStores, createStores, reloadStores } = useStores();
	const { Settings } = useSettings();
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			lang: setLanguageModel(langList, {
				title: '',
				description: '',
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
			createStores(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateStores(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadStores(), SUBMIT_TIMEOUT);
	};

	return (
		<form>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') + ' ' + t('model_item.Stores').toLowerCase()
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
								{config.OPTIONS.model.Stores.type_list.map((item) => (
									<Select.Option value={item} key={item}>
										{t(`types:${item}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Country'}
						name={'store_country'}
						control={control}
						defaultValue={detailData.store_country || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Coutry'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'City'}
						name={'store_city'}
						control={control}
						defaultValue={detailData.store_city || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'City'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Address'}
						name={'store_address'}
						control={control}
						defaultValue={detailData.store_address || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Address'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'ZIP Code'}
						name={'store_zip'}
						control={control}
						defaultValue={detailData.store_zip || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'ZIP Code'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Phone'}
						name={'store_phone'}
						control={control}
						defaultValue={detailData.store_phone || []}
					>
						{(row) => (
							<Select
								mode="tags"
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Phone'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'E-mail'}
						name={'store_email'}
						control={control}
						defaultValue={detailData.store_email || []}
					>
						{(row) => (
							<Select
								mode="tags"
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'E-mails'}
							/>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Store location'}
						name={'store_location'}
						control={control}
						defaultValue={detailData.store_location || [0, 0]}
					>
						{(row) => (
							<>
								<Manager.Location value={row.value} onChange={row.onChange} />
							</>
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
									label={'Description'}
									name={`lang.${lng}.description`}
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
											placeholder={'Description'}
											rows={5}
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
									onChange={(value) => row.onChange(value)}
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
				<Section.Base withBorder>
					<Form.Row
						label={'Rating'}
						name={'rating'}
						control={control}
						defaultValue={detailData.rating || 0}
					>
						{(row) => (
							<>
								<Rate value={row.value} onChange={row.onChange} />
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

export default StoresDetailForm;
