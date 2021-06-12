import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch } from 'antd';
import styled from 'styled-components';

import { SUBMIT_TIMEOUT } from '../../../constants';
import { usePayments } from '../../../Market/hooks';
import { PaymentsItemProps } from '../../../Market/types';
import { Modal, Typography, Form, Section } from '../../ui';
import DetailFooter from '../DetailFooter';
import { string } from '../../../../../libs/js/utils';
import config from '../../../config';
import setLanguageModel from '../setLanguageModel';
import { useSettings } from '../../../App/hooks';
import LanguageToggle from '../../Language';
import Manager from '../../Manager';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface PaymentsDetailFormProps {
	detailData: PaymentsItemProps;
	onCancel: Function;
	onSave: (data, response) => void;
	onDelete: Function;
	allowSave: boolean;
	allowDelete: boolean;
}

const PaymentsDetailForm: React.FC<PaymentsDetailFormProps> = (props) => {
	const {
		detailData,
		onCancel,
		onSave,
		onDelete,
		allowSave,
		allowDelete,
	} = props;
	const { t } = useTranslation(['common']);
	const { updatePayments, createPayments, reloadPayments } = usePayments();
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
			createPayments(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		} else {
			updatePayments(master).then((response) => {
				onSave(master, response);
				onCancel();
			});
		}

		setTimeout(() => reloadPayments(), SUBMIT_TIMEOUT);
	};

	return (
		<form>
			<Modal.Header>
				<div className="modal-heading-title">
					{detailData.is_new
						? t('title.create_new') +
						  ' ' +
						  t('model_item.Payments').toLowerCase()
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
								{config.OPTIONS.model.Payments.type_list.map((item) => (
									<Select.Option value={item} key={item}>
										{t(`types:${item}`)}
									</Select.Option>
								))}
							</Select>
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
						label={'Price'}
						name={'item_price'}
						control={control}
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
						label={'Weight limit'}
						name={'item_weight_limit'}
						control={control}
						defaultValue={detailData.item_weight_limit || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Weight limit'}
							/>
						)}
					</Form.Row>
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

export default PaymentsDetailForm;
