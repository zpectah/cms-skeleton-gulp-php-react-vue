import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import OPTIONS from '../../../../../config/options.json';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { PostsItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section, Picker, Wysiwyg } from '../../ui';
import LanguageToggle from '../../LanguageToggle';
import CFG from '../../../../../config/global.json';
import { usePosts, useSettings, useProfile } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface PostsDetailFormProps {
	detailData: PostsItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const PostsDetailForm: React.FC<PostsDetailFormProps> = (props) => {
	const { t } = useTranslation(['common']);
	const { detailData, onCancel, onSave, onDelete } = props;
	const { updatePosts, createPosts, reloadPosts } = usePosts();
	const { Settings } = useSettings();
	const { Profile } = useProfile();
	const [lang, setLang] = useState(CFG.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const {
		control,
		handleSubmit,
		formState,
		register,
		watch,
		getValues,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			type: 'default',
			name: '',
			category: [],
			tags: [],
			event_start: '', // TODO
			event_end: '', // TODO
			event_location: '', // TODO
			media: '', // TODO
			img_main: '', // TODO
			img_thumbnail: '', // TODO
			author: 0,
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
		if (detailData.is_new) {
			createPosts(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		} else {
			updatePosts(data).then((response) => {
				onSave(data, response);
				onCancel();
			});
		}

		setTimeout(() => reloadPosts(), SUBMIT_TIMEOUT);
	};

	const watchType = watch('type');

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<input
				type="hidden"
				name="id"
				ref={register({ required: true })}
				defaultValue={detailData.id}
			/>
			{/* blank model in case of type ...*/}
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
			<input
				type="hidden"
				name="media"
				ref={register({})}
				defaultValue={detailData.media}
			/>
			{/* */}
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
								placeholder={'Select categories'}
								options={OPTIONS.model.Posts.type}
							/>
						)}
					</Form.Row>
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
					{''}
					{
						{
							event: (
								<>
									<hr />
									<Form.Row
										label={'event start'}
										name={'event_start'}
										control={control}
									>
										{(row) => (
											<Input
												id={row.id}
												type={'text'}
												name={row.name}
												value={row.value}
												onChange={row.onChange}
												placeholder={'event_start'}
											/>
										)}
									</Form.Row>
									<Form.Row
										label={'event end'}
										name={'event_end'}
										control={control}
									>
										{(row) => (
											<Input
												id={row.id}
												type={'text'}
												name={row.name}
												value={row.value}
												onChange={row.onChange}
												placeholder={'event_end'}
											/>
										)}
									</Form.Row>
									<Form.Row
										label={'event location'}
										name={'event_location'}
										control={control}
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
									<hr />
								</>
							),
							media: (
								<>
									<hr />
									<Form.Row label={'media'} name={'media'} control={control}>
										{(row) => (
											<Input
												id={row.id}
												type={'text'}
												name={row.name}
												value={row.value}
												onChange={row.onChange}
												placeholder={'media'}
											/>
										)}
									</Form.Row>
									<hr />
								</>
							),
						}[watchType]
					}
					<Form.Row label={'img main'} name={'img_main'} control={control}>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'img_main'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'img thumbnail'}
						name={'img_thumbnail'}
						control={control}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'img_thumbnail'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'author'}
						name={'author'}
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
								placeholder={'author'}
							/>
						)}
					</Form.Row>
					{''}
					<Form.Row label={'Category'} name={'category'} control={control}>
						{(row) => (
							<Picker.Categories
								id={row.id}
								value={row.value}
								onChange={row.onChange}
							/>
						)}
					</Form.Row>
					<Form.Row label={'Tags'} name={'tags'} control={control}>
						{(row) => (
							<Picker.Tags
								id={row.id}
								value={row.value}
								onChange={row.onChange}
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
									rules={{ required: true }}
									required
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

export default PostsDetailForm;
