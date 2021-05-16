import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { Input, Switch, Upload } from 'antd';
import styled from 'styled-components';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { UploadsItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section, Picker } from '../../ui';
import LanguageToggle from '../../LanguageToggle';
import CFG from '../../../../../config/global.json';
import { useUploads, useSettings } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;
const UploaderWrapper = styled.div`
	padding: 2rem 2rem;
	text-align: center;
`;

interface UploadsDetailFormProps {
	detailData: UploadsItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const UploadsDetailForm: React.FC<UploadsDetailFormProps> = (props) => {
	const { t } = useTranslation(['common']);
	const { detailData, onCancel, onSave, onDelete } = props;
	const { updateUploads, createUploads, reloadUploads } = useUploads();
	const { Settings } = useSettings();
	const [lang, setLang] = useState(CFG.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const { control, handleSubmit, formState, register, watch } = useForm({
		mode: 'onChange',
		defaultValues: {
			type: 'undefined',
			name: '',
			extension: '',
			file_name: '',
			file_mime: '',
			file_size: '',
			category: [],
			active: 1,
			lang: setLanguageModel(langList, {
				title: '',
			}),
			file: null,
			...detailData,
		},
	});
	const [blob, setBlob] = useState<any>(null);
	// const { TextArea } = Input;
	const { Dragger } = Upload;

	useEffect(() => {
		if (Settings) setLangList(Settings.language_active);
	}, [Settings]);

	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const submitHandler = (data) => {
		const master = {
			...data,
			fileBase64: blob,
		};

		if (detailData.is_new) {
			createUploads(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateUploads(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadUploads(), SUBMIT_TIMEOUT);
	};

	const prepareUpload = (file) => {
		const b64 = toBase64(file);

		console.log('blob b64 ', b64);

		return setBlob(b64);
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
						  t('model_item.Uploads').toLowerCase()
						: detailData.name}
				</Typography.Title>
			</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<>
						<Controller
							name={'file'}
							control={control}
							render={({ onChange, onBlur, value, name, ref }) => (
								<Dragger
									action={prepareUpload}
									onChange={(info) => {
										const { status } = info.file;
										if (status !== 'uploading') {
											console.log(status, info.file, info.fileList);
										}
										if (status === 'done') {
											// message.success(`${info.file.name} file uploaded successfully.`);

											//
											console.log(info.file.name + ' ... uploaded');
											console.log(info.file);
											//
											onChange(info.file);
										} else if (status === 'error') {
											// message.error(`${info.file.name} file upload failed.`);
										}
									}}
								>
									<UploaderWrapper>Pick file to upload ...</UploaderWrapper>
								</Dragger>
							)}
						/>
					</>
				</Section.Base>
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
					<Form.Row label={'Gallery'} name={'category'} control={control}>
						{(row) => (
							<Picker.Categories
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								mode="gallery"
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
									label={'Value'}
									name={`lang.${lng}.title`}
									control={control}
									rules={{ required: true }}
									defaultValue={''}
									required
								>
									{(row) => (
										<Input
											id={row.id}
											type="text"
											name={row.name}
											value={row.value}
											onChange={row.onChange}
											placeholder={'Title'}
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

export default UploadsDetailForm;
