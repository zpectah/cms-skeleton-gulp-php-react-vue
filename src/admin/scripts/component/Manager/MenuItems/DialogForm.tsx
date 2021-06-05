import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Input, Select, Switch, message } from 'antd';
import styled from 'styled-components';

import config from '../../../config';
import { Button, Modal, Form, Section } from '../../ui';
import Picker from '../../Picker';
import { MenuItemsItemProps } from '../../../App/types';
import setLanguageModel from '../../Detail/setLanguageModel';
import { useMenuItems, useSettings } from '../../../App/hooks';
import LanguageToggle from '../../Language';
import { string } from '../../../../../libs/js/utils';

const LanguageWrapper = styled.div``;
const LanguageWrapperPanel = styled.div<{ isActive: boolean }>`
	display: ${(props) => (props.isActive ? 'block' : 'none')};
`;

interface DialogFormProps {
	data: MenuItemsItemProps;
	toggleDialog: () => void;
	afterSubmit: (master: any, response: any) => void;
	menuId: number | string;
	onDelete: (id: number | string) => void;
}

const DialogForm: React.FC<DialogFormProps> = ({
	data,
	toggleDialog,
	afterSubmit,
	menuId,
	onDelete,
}) => {
	const { Settings } = useSettings();
	const { updateMenuItems, createMenuItems } = useMenuItems();
	const { t } = useTranslation(['common']);
	const [isNew, setNew] = useState(data.is_new);
	const [lang, setLang] = useState(config.GLOBAL.PROJECT.LANG_DEFAULT);
	const [langList, setLangList] = useState<string[]>([]);
	const { control, handleSubmit, formState, register } = useForm({
		mode: 'all',
		defaultValues: {
			lang: setLanguageModel(langList, {
				title: '',
			}),
			...data,
		},
	});

	useEffect(() => {
		if (Settings) setLangList(Settings.language_active);
	}, [Settings]);

	const submitHandler = (data: MenuItemsItemProps, e) => {
		e.preventDefault();

		const master = {
			...data,
			name: string.replaceSpaces(data.name),
			menu: menuId,
		};

		if (isNew) {
			createMenuItems(master).then((response) => {
				message.success('Create success', 2.5);

				afterSubmit(master, response);
			});
		} else {
			updateMenuItems(master).then((response) => {
				message.success('Update success', 2.5);

				afterSubmit(master, response);
			});
		}
	};

	return (
		<form>
			<Modal.Header>{isNew ? 'Create new menu item' : data.name}</Modal.Header>
			<Modal.Content>
				<Section.Base>
					<div>
						<input
							type="hidden"
							name="id"
							ref={register({ required: !isNew })}
							defaultValue={data.id}
						/>
					</div>
					<Form.Row
						label={'Name'}
						name={'name'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={data.name || ''}
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
						defaultValue={data.type || 'default'}
					>
						{(row) => (
							<Select
								style={{ width: '100%' }}
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Select type'}
							>
								{config.OPTIONS.model.MenuItems.type_list.map((item) => (
									<Select.Option value={item} key={item}>
										{t(`types:${item}`)}
									</Select.Option>
								))}
							</Select>
						)}
					</Form.Row>
					<Form.Row
						label={'Link'}
						name={'link'}
						control={control}
						rules={{ required: true }}
						required
						defaultValue={data.link || ''}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'text'}
								name={row.name}
								value={row.value}
								onChange={row.onChange}
								placeholder={'Link'}
							/>
						)}
					</Form.Row>
					<Form.Row
						label={'Parent'}
						name={'parent'}
						control={control}
						defaultValue={data.parent || ''}
					>
						{(row) => (
							<Picker.MenuItems
								id={row.id}
								value={row.value}
								onChange={row.onChange}
								ignoredId={[data?.id]}
								single
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
									defaultValue={''}
									required
								>
									{(row) => (
										<Input
											type="text"
											id={row.id}
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
					<Form.Row
						label={'Order'}
						name={'item_order'}
						control={control}
						defaultValue={data.item_order || 0}
					>
						{(row) => (
							<Input
								id={row.id}
								type={'number'}
								name={row.name}
								value={row.value}
								onChange={(e) => {
									row.onChange(Number(e.target.value));
								}}
								placeholder={'Order'}
							/>
						)}
					</Form.Row>
				</Section.Base>
				<Section.Base>
					<Form.Row
						label={'Active'}
						name={'active'}
						control={control}
						defaultValue={data.active || true}
					>
						{(row) => (
							<Switch checked={row.value == 1} onChange={row.onChange} />
						)}
					</Form.Row>
				</Section.Base>
			</Modal.Content>
			<Modal.Footer>
				<Button.Base onClick={toggleDialog}>Cancel</Button.Base>
				<Button.Base
					// htmlType="submit"
					onClick={handleSubmit(submitHandler)}
					type="primary"
					disabled={!formState.isValid}
				>
					{isNew ? t('btn.create') : t('btn.save')}
				</Button.Base>
				{!isNew && (
					<Button.Base type="primary" danger onClick={() => onDelete(data.id)}>
						Delete
					</Button.Base>
				)}
			</Modal.Footer>
		</form>
	);
};

export default DialogForm;
