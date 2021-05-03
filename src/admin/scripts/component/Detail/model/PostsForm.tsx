import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Switch } from 'antd';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { PostsItemProps } from '../../../App/types';
import { Button, Modal, Typography, Form, Section } from '../../ui';
import api from '../../../utils/api';
import LanguageToggle from '../../LanguageToggle';
import CFG from '../../../../../config/global.json';
import { usePosts } from '../../../App/hooks';

interface PostsDetailFormProps {
	detailData: PostsItemProps;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const PostsDetailForm: React.FC<PostsDetailFormProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;
	const { t } = useTranslation(['common']);
	const { control, handleSubmit, setValue, formState, register } = useForm({
		mode: 'onChange',
		defaultValues: {
			type: 'default',
			name: '',
			category: [],
			tags: [],
			active: 1,
			lang: {
				// TODO
				en: {
					title: '',
					perex: '',
					content: '',
				},
			},
			...detailData,
		},
	});
	const [lang, setLang] = useState(CFG.PROJECT.LANG_DEFAULT);
	const { updatePosts, createPosts, reloadPosts } = usePosts();

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
				<LanguageToggle onChange={(lang) => setLang(lang)} />
				<br />
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
					<Form.Row label={'Active'} name={'active'} control={control}>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
					{/* TODO: ... */}
					<br />
					{'lang' + lang}
				</Section.Base>
			</Modal.Content>
			<Modal.Footer>
				<Button.Base onClick={() => onCancel()}>{t('btn.close')}</Button.Base>
				{!detailData.is_new && (
					<>
						<Button.Base
							type="primary"
							onClick={() => onDelete(detailData)}
							danger
						>
							{t('btn.delete')}
						</Button.Base>
					</>
				)}
				<Button.Base
					type="primary"
					htmlType="submit"
					disabled={!formState.isValid}
				>
					{detailData.is_new ? t('btn.create') : t('btn.save')}
				</Button.Base>
			</Modal.Footer>
		</form>
	);
};

export default PostsDetailForm;
