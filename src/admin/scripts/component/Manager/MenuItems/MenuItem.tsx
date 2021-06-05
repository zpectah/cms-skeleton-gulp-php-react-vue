import React from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, Tag } from 'antd';

import { MenuItemsItemProps } from '../../../App/types';

const Wrapper = styled.div`
	width: auto;
	height: auto;
	margin: 0 1rem 1rem 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	background-color: rgba(200, 200, 200, 0.125);

	&:hover {
		background-color: red;
	}
`;
const ButtonText = styled.span<{ isDisabled: boolean }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;

	${(props) =>
		props.isDisabled &&
		`
		opacity: .5;
		color: red;
	`}
`;

interface MenuItemProps {
	item: MenuItemsItemProps;
	onSelect: (item) => void;
	onToggle: (id) => void;
	onDelete: (id) => void;
	onUpdateOrder: (item, method) => void;
	context?: 'select' | 'orphan';
}

const MenuItem: React.FC<MenuItemProps> = ({
	children,
	item,
	onSelect,
	onToggle,
	onDelete,
	onUpdateOrder,
	context = 'select',
}) => {
	const menu = (
		<Menu>
			<Menu.Item key="1" onClick={() => onToggle(item.id)}>
				{item.active == 1 ? 'Disable' : 'Active'}
			</Menu.Item>
			<Menu.Item key="2" onClick={() => onDelete(item.id)}>
				Delete
			</Menu.Item>
			<Menu.Item key="4" onClick={() => onUpdateOrder(item, '+')}>
				Order + 1
			</Menu.Item>
			<Menu.Item key="5" onClick={() => onUpdateOrder(item, '-')}>
				Order - 1
			</Menu.Item>
		</Menu>
	);

	return (
		<Wrapper>
			{context == 'select' ? (
				<Dropdown.Button
					overlay={menu}
					onClick={() => onSelect(item)}
					size="large"
				>
					<ButtonText isDisabled={!(item.active == 1)}>
						{item.name}
						&nbsp;
						<Tag>{item.item_order}</Tag>
					</ButtonText>
				</Dropdown.Button>
			) : (
				<div>{item.name}</div>
			)}
			{children && <div>{children}</div>}
		</Wrapper>
	);
};

export default MenuItem;
