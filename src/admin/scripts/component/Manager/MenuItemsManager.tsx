import React, { useState } from 'react';
import styled from 'styled-components';

import { useMenuItems } from '../../App/hooks';
import { Button, Modal } from '../ui';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
`;
const DialogStructureWrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 1rem;
	background-color: rgba(200, 200, 200, 0.5);
`;
const SelectedStructureContainer = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 1rem 0;
`;

interface MenuItemsManagerProps {
	selected?: string[];
	menuId: number | string;
	onUpdate?: () => void;
}

const MenuItemsManager: React.FC<MenuItemsManagerProps> = ({
	selected = [],
	menuId,
}) => {
	const { MenuItems } = useMenuItems();
	const [dialogOpen, setDialogOpen] = useState(false);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={toggleDialog} size={'xxl'}>
				<Modal.Header>Menu items manager</Modal.Header>
				<Modal.Content>
					<DialogStructureWrapper>
						... manager items structure ...
					</DialogStructureWrapper>
				</Modal.Content>
				<Modal.Footer>... actions</Modal.Footer>
			</Modal.Base>
			<Wrapper>
				<Button.Base onClick={toggleDialog} type="primary" ghost>
					Manager
				</Button.Base>
				<SelectedStructureContainer>
					... selected items structure ...
				</SelectedStructureContainer>
			</Wrapper>
		</>
	);
};

export default MenuItemsManager;
