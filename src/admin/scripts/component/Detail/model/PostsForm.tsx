import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch, Select } from 'antd';
import styled from 'styled-components';

import OPTIONS from '../../../../../config/options.json';
import { SUBMIT_TIMEOUT } from '../../../constants';
import { PostsItemProps } from '../../../App/types';
import { Modal, Typography, Form, Section, Picker, Wysiwyg } from '../../ui';
import LanguageToggle from '../../LanguageToggle';
import CFG from '../../../../../config/global.json';
import { usePosts, useSettings } from '../../../App/hooks';
import DetailFooter from '../DetailFooter';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

const getLanguageContent = (langList = []) => {
	let l = {};
	const obj = {
		title: '',
		perex: '',
		content: '',
	};

	langList.map((lng) => {
		l[lng] = obj;
	});

	return l;
};

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
	const [lang, setLang] = useState(CFG.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>(Settings?.language_active);
	const { control, handleSubmit, formState, register, getValues } = useForm({
		mode: 'onChange',
		defaultValues: {
			type: 'default',
			name: '',
			category: [],
			tags: [],
			active: 1,
			lang: getLanguageContent(langList),
			...detailData,
		},
	});
	const { TextArea } = Input;

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
						{console.log('langList: ', langList)}
						{langList?.map((lng) => (
							<LanguageWrapperPanel key={lng} isActive={lng == lang}>
								<Form.Row
									label={'Title'}
									name={`lang.${lng}.title`}
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
											placeholder={'Title'}
										/>
									)}
								</Form.Row>
								<Form.Row
									label={'Perex'}
									name={`lang.${lng}.perex`}
									control={control}
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
