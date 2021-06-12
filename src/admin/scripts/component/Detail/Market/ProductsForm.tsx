import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Rate, Select, Switch } from 'antd';
import styled from 'styled-components';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { useProducts } from '../../../Market/hooks';
import { ProductsItemProps } from '../../../Market/types';
import { Modal, Typography, Form, Section, Wysiwyg } from '../../ui';
import DetailFooter from '../DetailFooter';
import setLanguageModel from '../setLanguageModel';
import { string } from '../../../../../libs/js/utils';
import LanguageToggle from '../../Language';
import config from '../../../config';
import { useSettings } from '../../../App/hooks';
import Picker from '../../Picker';
import Manager from '../../Manager';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface ProductsDetailFormProps {
	detailData: ProductsItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const ProductsDetailForm: React.FC<ProductsDetailFormProps> = (props) => {
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { t } = useTranslation(['common']);
	const { Settings } = useSettings();
	const { updateProducts, createProducts, reloadProducts } = useProducts();
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			lang: setLanguageModel(langList, {
				title: '',
				description: '',
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
			createProducts(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updateProducts(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadProducts(), SUBMIT_TIMEOUT);
	};

	return (
		<form>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Products').toLowerCase()
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
						defaultValue={detailData.type || 'package'}
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select type'}
							>
								{config.OPTIONS.model.Products.type_list.map((item) => (
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
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Price'}
						name={'item_price'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.item_price || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Price'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Discount'}
						name={'item_discount'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.item_discount || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Discount'}
							/>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Weight'}
						name={'item_weight'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.item_weight || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Weight'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Length'}
						name={'item_length'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.item_length || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Length'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Width'}
						name={'item_width'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.item_width || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Width'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Height'}
						name={'item_height'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.item_height || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Height'}
							/>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Amount'}
						name={'item_amount'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={detailData.item_amount || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Amount'}
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
						label={'Related products'}
						name={'items_related'}
						control={control}
						defaultValue={detailData.items_related || []}
					>
						{(row) => (
							<Picker.Products
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								ignoredId={detailData.id !== 'new' && [detailData.id]}
							/>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base withBorder>
					<Form.Row
						label={'Attachments'}
						name={'attachments'}
						control={control}
						defaultValue={detailData.attachments || ''}
					>
						{(row) => (
							<Manager.Uploads selected={row.value} onChange={row.onChange} />
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
				<Section.Base withBorder>
					<Form.Row
						label={'Is new'}
						name={'item_new'}
						control={control}
						defaultValue={detailData.item_new || false}
					>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
					<Form.Row
						label={'Is used'}
						name={'item_used'}
						control={control}
						defaultValue={detailData.item_used || false}
					>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
					<Form.Row
						label={'Is unboxed'}
						name={'item_unboxed'}
						control={control}
						defaultValue={detailData.item_unboxed || false}
					>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
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

export default ProductsDetailForm;
