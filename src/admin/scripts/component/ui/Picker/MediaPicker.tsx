import React, { useState } from 'react';

import Modal from '../Modal';

interface MediaPickerProps {
	value: string;
	onChange: Function;
}

const MediaPicker: React.FC<MediaPickerProps> = ({ value, onChange }) => {
	const [visible, setVisible] = useState(false);

	const showDialog = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<button type="button" onClick={showDialog}>
				Open media dialog
			</button>
			<Modal.Base visible={visible} onCancel={onClose}>
				<Modal.Content>
					<div>input for media ... {value}</div>
				</Modal.Content>
			</Modal.Base>
		</>
	);
};

export default MediaPicker;
