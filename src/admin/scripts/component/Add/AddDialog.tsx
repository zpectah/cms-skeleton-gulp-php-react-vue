import React from 'react';
import { Modal } from 'antd'; // https://ant.design/components/modal/
import styled from 'styled-components';

import routes from '../../App/routes.json';
import { Button } from '../../component/ui';

const Content = styled.div``;

interface AddDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const AddDialog: React.FC<AddDialogProps> = (props) => {
	const { isOpen, onCancel } = props;

	return (
		<Modal
			visible={isOpen}
			onCancel={onCancel}
			wrapClassName="DialogCover"
			footer={null}
			centered
		>
			<Content>
				Modal 'AddDialog' content
				<br />
				<Button.CreateNew
					routePathPrefix={routes.posts.pathDetail}
					buttonText={'Create new post'}
				/>
				<br />
				<Button.CreateNew
					routePathPrefix={routes.users.pathDetail}
					buttonText={'Create new user'}
				/>
				<br />
			</Content>
		</Modal>
	);
};

export default AddDialog;
