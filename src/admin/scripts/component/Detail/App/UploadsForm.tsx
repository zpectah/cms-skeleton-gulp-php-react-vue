import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { Input, Switch } from 'antd';
import styled from 'styled-components';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { UploadsItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section, Picker, Uploader } from '../../ui';
import LanguageToggle from '../../LanguageToggle';
import CFG from '../../../../../config/global.json';
import { useUploads, useSettings } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;
const MediaContainer = styled.div`
	height: 250px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(250, 250, 250, 0.9);
`;
const StyledImage = styled.img`
	width: auto;
	max-height: 100%;
`;
const MediaTemporary = styled.div`
	width: 100%;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const ButtonReset = styled.button`
	width: auto;
	height: auto;
	padding: 1rem;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	border: 0;
	outline: none;
	cursor: pointer;
	color: rgb(255, 255, 255);
	background-color: rgba(25, 25, 25, 0.5);
	opacity: 0.75;

	&:hover {
		opacity: 1;
	}
`;
const PreloaderLayer = styled.div``;

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
	const [uploading, setUploading] = useState(false);
	const { control, handleSubmit, register, watch, setValue } = useForm({
		mode: 'onChange',
		defaultValues: {
			name: '',
			category: [],
			active: 1,
			lang: setLanguageModel(langList, {
				title: '',
			}),
			...detailData,
		},
	});
	const [tmp_blob, setTmp_Blob] = useState<any>(null);
	const [tmp_meta, setTmp_meta] = useState({
		extension: '',
		name: '',
		mime: '',
		size: 0,
		type: 'undefined',
	});
	const watchName = watch('name');

	useEffect(() => {
		if (Settings) setLangList(Settings.language_active);
	}, [Settings]);

	const submitHandler = (data) => {
		if (detailData.is_new) {
			const master = {
				...data,
				fileBase64: tmp_blob,
				extension: tmp_meta.extension,
				file_name: tmp_meta.name,
				file_mime: tmp_meta.mime,
				file_size: tmp_meta.size,
				type: tmp_meta.type,
			};

			if (tmp_blob) {
				setUploading(true);
				createUploads(master).then((response) => {
					setUploading(false);
					onSave(master, response);
					onCancel();
				});
			}
		} else {
			const master = {
				...detailData,
				...data,
			};

			updateUploads(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadUploads(), SUBMIT_TIMEOUT);
	};

	const resetBlob = () => {
		setTmp_Blob(null);
		setTmp_meta({
			extension: '',
			name: '',
			mime: '',
			size: 0,
			type: 'undefined',
		});
	};

	const uploaderHandler = (blob, name, ext, mime, size, type) => {
		setTmp_Blob(blob);
		setTmp_meta({
			extension: ext,
			name: name,
			mime: mime,
			size: size,
			type: type,
		});

		return setValue('name', name.split('.').slice(0, -1).join('.'));
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
						{detailData.is_new ? (
							<>
								{uploading && (
									<PreloaderLayer> ... uploading ... </PreloaderLayer>
								)}
								{tmp_blob ? (
									<MediaContainer>
										<ButtonReset type="button" onClick={resetBlob}>
											Clear
										</ButtonReset>
										<>
											{tmp_meta.type == 'image' ? (
												<StyledImage src={tmp_blob} alt={tmp_meta.name} />
											) : (
												<MediaTemporary>
													icon for file type ({tmp_meta.type})
												</MediaTemporary>
											)}
										</>
									</MediaContainer>
								) : (
									<Uploader onChange={uploaderHandler} />
								)}
							</>
						) : (
							<MediaContainer>
								{detailData.type == 'image' ? (
									<StyledImage
										src={
											config.ROOT_PATH + 'uploads/image/' + detailData.file_name
										}
										alt={detailData.name}
									/>
								) : (
									<MediaTemporary>
										icon for file type ({detailData.type})
									</MediaTemporary>
								)}
							</MediaContainer>
						)}
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
								readOnly={!detailData.is_new}
								disabled={!detailData.is_new}
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
									label={'Title'}
									name={`lang.${lng}.title`}
									control={control}
									defaultValue={''}
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
				invalid={detailData.is_new ? !(watchName && tmp_blob) : false}
				detailData={detailData}
			/>
		</form>
	);
};

export default UploadsDetailForm;
