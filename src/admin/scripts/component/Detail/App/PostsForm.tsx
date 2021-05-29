import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import config from '../../../config';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { PostsItemProps } from '../../../App/types';
import {
	Modal,
	Typography,
	Form,
	Section,
	Picker,
	Wysiwyg,
	Manager,
} from '../../ui';
import { usePosts, useSettings, useProfile } from '../../../App/hooks';
import LanguageToggle from '../../Language';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';
import { string } from '../../../../../libs/js/utils';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface PostsDetailFormProps {
	detailData: PostsItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const PostsDetailForm: React.FC<PostsDetailFormProps> = (props) => {
	const { t } = useTranslation(['common']);
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { updatePosts, createPosts, reloadPosts } = usePosts();
	const { Settings } = useSettings();
	const { Profile } = useProfile();
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const DatePickerFormat = config.LOCALES.dateTimeFormat;
	const { control, handleSubmit, formState, register, watch } = useForm({
		mode: 'onChange',
		defaultValues: {
			lang: setLanguageModel(langList, {
				title: '',
				perex: '',
				content: '',
			}),
			...detailData,
		},
	});
	const { TextArea } = Input;
	const [tmp_published, setTmp_published] = useState<string>(
		moment(detailData.published).format(),
	);
	const [tmp_event_start, setTmp_event_start] = useState<string>(
		detailData.event_start || moment().format(),
	);
	const [tmp_event_end, setTmp_event_end] = useState<string>(
		detailData.event_end || moment().format(),
	);

	useEffect(() => {
		if (Settings) setLangList(Settings.language_active);
	}, [Settings]);

	const submitHandler = (data) => {
		const master = {
			...data,
			name: string.replaceSpaces(data.name),
			// Reduce and repair date data before submit
			published: tmp_published
				? tmp_published
				: moment(detailData.published).format(),
			event_start:
				data.type == 'event' ? tmp_event_start : detailData.event_start,
			event_end: data.type == 'event' ? tmp_event_end : detailData.event_end,
			//
		};

		if (detailData.is_new) {
			createPosts(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updatePosts(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadPosts(), SUBMIT_TIMEOUT);
	};

	const watchType = watch('type');

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<div>
				<input
					type="hidden"
					name="id"
					ref={register({ required: true })}
					defaultValue={detailData.id}
				/>
				<input
					type="hidden"
					name="author"
					ref={register({ required: true })}
					defaultValue={detailData.author}
				/>
				<input
					type="hidden"
					name="post_options"
					ref={register({ required: true })}
					defaultValue={detailData.post_options}
				/>
				{watchType !== 'event' && (
					<>
						<input
							type="hidden"
							name="event_start"
							ref={register({})}
							defaultValue={detailData.event_start}
						/>
						<input
							type="hidden"
							name="event_end"
							ref={register({})}
							defaultValue={detailData.event_end}
						/>
						<input
							type="hidden"
							name="event_location"
							ref={register({})}
							defaultValue={detailData.event_location}
						/>
					</>
				)}
				{watchType !== 'media' && (
					<>
						<input
							type="hidden"
							name="media"
							ref={register({})}
							defaultValue={detailData.media}
						/>
					</>
				)}
			</div>
			<Modal.Header>
				<Typography.Title level={'h3'} noMargin>
					{detailData.is_new
						? t('title.create_new') + ' ' + t('model_item.Posts').toLowerCase()
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
						defaultValue={detailData.type || 'article'}
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select categories'}
								options={config.OPTIONS.model.Posts.type}
							/>
						)}
					</Form.Row>
					{
						{
							event: (
								<>
									<Form.Row
										label={'Event start'}
										name={'event_start'}
										control={control}
										rules={{ required: watchType == 'event' }}
										required={watchType == 'event'}
										defaultValue={detailData.event_start || new Date()}
									>
										{(row) => (
											<DatePicker
												id={row.id}
												name={row.name}
												value={moment(row.value, DatePickerFormat)}
												onChange={(value) => {
													row.onChange(value);
													setTmp_event_start(value.format());
												}}
												placeholder={'Event start'}
												ref={row.ref}
												style={{ width: '100%' }}
												showTime
												defaultValue={moment()}
											/>
										)}
									</Form.Row>
									<Form.Row
										label={'Event end'}
										name={'event_end'}
										control={control}
										rules={{ required: watchType == 'event' }}
										required={watchType == 'event'}
										defaultValue={detailData.event_end || new Date()}
									>
										{(row) => (
											<DatePicker
												id={row.id}
												name={row.name}
												value={moment(row.value, DatePickerFormat)}
												onChange={(value) => {
													row.onChange(value);
													setTmp_event_end(value.format());
												}}
												placeholder={'Event end'}
												ref={row.ref}
												style={{ width: '100%' }}
												showTime
											/>
										)}
									</Form.Row>
									<Form.Row
										label={'event location'}
										name={'event_location'}
										control={control}
										rules={{ required: watchType == 'event' }}
										required={watchType == 'event'}
										defaultValue={detailData.event_location || ''}
									>
										{(row) => (
											<Input
												id={row.id}
												type={'text'}
												name={row.name}
												value={row.value}
												onChange={row.onChange}
												placeholder={'event_location'}
											/>
										)}
									</Form.Row>
								</>
							),
							media: (
								<>
									<Form.Row
										label={'media'}
										name={'media'}
										control={control}
										rules={{ required: watchType == 'media' }}
										required={watchType == 'media'}
										defaultValue={detailData.media || ''}
									>
										{(row) => (
											<>
												<Manager.Uploads
													type="image"
													selected={row.value}
													onChange={row.onChange}
												/>
											</>
										)}
									</Form.Row>
								</>
							),
						}[watchType]
					}
					<Form.Row
						label={'Category'}
						name={'category'}
						control={control}
						defaultValue={detailData.category || []}
					>
						{(row) => (
							<Picker.Categories
								id={row.id}
								value={row.value}
								onChange={row.onChange}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Tags'}
						name={'tags'}
						control={control}
						defaultValue={detailData.tags || []}
					>
						{(row) => (
							<Picker.Tags
								id={row.id}
								value={row.value}
								onChange={row.onChange}
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
									label={'Title'}
									name={`lang.${lng}.title`}
									control={control}
									rules={{ required: true }}
									required
									// defaultValue={detailData.lang[lng].title || ''}
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
									long
									// defaultValue={detailData.lang[lng].perex || ''}
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
									rules={{ required: true }}
									required
									long
									// defaultValue={detailData.lang[lng].content || ''}
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
					<Form.Row
						label={'Published'}
						name={'published'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.published || new Date()}
					>
						{(row) => (
							<DatePicker
								id={row.id}
								name={row.name}
								value={moment(row.value, DatePickerFormat)}
								onChange={(value) => {
									row.onChange(value);
									setTmp_published(value.format());
								}}
								placeholder={'Published'}
								ref={row.ref}
								style={{ width: '100%' }}
								showTime
							/>
						)}
					</Form.Row>
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
			/>
		</form>
	);
};

export default PostsDetailForm;
