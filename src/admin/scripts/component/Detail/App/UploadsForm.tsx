import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';
import styled from 'styled-components';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { UploadsItemProps } from '../../../App/types';
import { Modal, Form, Section } from '../../ui';
import Picker from '../../Picker';
import FileUpload from '../../FileUpload';
import LanguageToggle from '../../Language';
import { useUploads, useSettings } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';
import { string } from '../../../../../libs/js/utils';
import Uploader from '../../Uploader';

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
const PreloaderLayer = styled.div``;

interface UploadsDetailFormProps {
	detailData: UploadsItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const UploadsDetailForm: React.FC<UploadsDetailFormProps> = (props) => {
	const { t } = useTranslation(['common']);
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { Uploads, updateUploads, createUploads, reloadUploads } = useUploads();
	const { Settings } = useSettings();
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const [uploading, setUploading] = useState(false);
	const { control, handleSubmit, register, watch, setValue } = useForm({
		mode: 'onChange',
		defaultValues: {
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
	const [duplicates, setDuplicates] = useState(false);
	const watchName = watch('name');

	useEffect(() => {
		if (Settings) setLangList(Settings.language_active);
	}, [Settings]);

	const submitHandler = (data) => {
		if (detailData.is_new) {
			const master = {
				...data,
				name: string.replaceSpaces(data.name),
				fileBase64: tmp_blob,
				fileBase64Cropped: null, // TODO
				extension: tmp_meta.extension,
				file_name: string.replaceSpaces(tmp_meta.name),
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

	const uploaderHandler = (blob, name, ext, mime, size, type, cropped) => {
		if (cropped) {
			setTmp_Blob(cropped);
		} else {
			setTmp_Blob(blob);
		}
		setTmp_meta({
			extension: ext,
			name: name,
			mime: mime,
			size: size,
			type: type,
		});

		return setValue('name', name.split('.').slice(0, -1).join('.'));
	};

	const onUploadReset = () => {
		setTmp_Blob(null);
		setTmp_meta({
			extension: '',
			name: '',
			mime: '',
			size: 0,
			type: 'undefined',
		});
	};

	const isDuplicate = (fileName) => {
		let duplicate = false;
		Uploads?.map((item) => {
			if (item.name == fileName) duplicate = true;
		});

		setDuplicates(duplicate);

		return duplicate;
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Uploads').toLowerCase()
						: detailData.name}
				</div>
			</Modal.Header>
			<Modal.Content>
				<div>
					<input
						type="hidden"
						name="id"
						ref={register({ required: true })}
						defaultValue={detailData.id}
					/>
				</div>
				<Section.Base withBorder>
					<>
						{detailData.is_new ? (
							<>
								{uploading && (
									<PreloaderLayer> ... uploading ... </PreloaderLayer>
								)}
								<FileUpload.Uploader
									onChange={uploaderHandler}
									onReset={onUploadReset}
								/>
							</>
						) : (
							<MediaContainer>
								{detailData.type == 'image' ? (
									<StyledImage
										src={
											config.UPLOADS_PATH.image.default + detailData.file_name
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
				<div>
					<Uploader.Wrapper
						onChange={() => {
							console.log('onChange');
						}}
						onReset={() => {
							console.log('onReset');
						}}
					/>
				</div>
				<Section.Base withBorder>
					<Form.Row
						label={'Name'}
						name={'name'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.name || ''}
						errors={duplicates ? ['This name is already in use'] : []}
					>
						{(row) => (
							<>
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
									readOnly={!detailData.is_new}
									disabled={!detailData.is_new}
								/>
							</>
						)}
					</Form.Row>
					<Form.Row
						label={'Gallery'}
						name={'category'}
						control={control}
						defaultValue={detailData.category || []}
					>
						{(row) => (
							<Picker.Categories
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								mode="gallery"
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
				invalid={
					detailData.is_new ? !(watchName && tmp_blob && !duplicates) : false
				}
				detailData={detailData}
				allowSave={allowSave}
				allowDelete={allowDelete}
			/>
		</form>
	);
};

export default UploadsDetailForm;
