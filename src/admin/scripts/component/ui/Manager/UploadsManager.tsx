import React, { useState } from 'react';
import styled from 'styled-components';

import { useUploads } from '../../../App/hooks';
import Modal from '../Modal';
import BaseButton from '../Button/BaseButton';
import { UploadsItemProps } from '../../../App/types';

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
`;
const SelectedStructureContainer = styled.div`
	width: 100%;
	height: auto;
	margin: 0;
	padding: 1rem 0;
`;

interface UploadsManagerProps {
	selected?: string[];
	onChange?: (selected: string[]) => void;
	single?: boolean;
	type?: 'all' | UploadsItemProps['type'];
}

const UploadsManager: React.FC<UploadsManagerProps> = ({
	selected = [],
	onChange,
	single = false,
	type = 'all',
}) => {
	const { Uploads } = useUploads();
	const [dialogOpen, setDialogOpen] = useState(false);

	const toggleDialog = () => setDialogOpen(!dialogOpen);

	return (
		<>
			<Modal.Base visible={dialogOpen} onCancel={toggleDialog} size={'lg'}>
				<Modal.Header>Menu items manager</Modal.Header>
				<Modal.Content>
					<DialogStructureWrapper>
						... {JSON.stringify(Uploads)} ... {type}
					</DialogStructureWrapper>
				</Modal.Content>
				<Modal.Footer>... actions</Modal.Footer>
			</Modal.Base>
			<Wrapper>
				<BaseButton onClick={toggleDialog} type="primary" ghost>
					Open manager
				</BaseButton>
				<SelectedStructureContainer>
					... selected items structure ...
				</SelectedStructureContainer>
			</Wrapper>
		</>
	);
};

export default UploadsManager;
