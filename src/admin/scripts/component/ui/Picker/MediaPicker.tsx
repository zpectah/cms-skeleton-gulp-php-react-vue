import React, { useState } from 'react';
import { Drawer } from 'antd';

interface MediaPickerProps {
	value: string;
	onChange: Function;
}

const MediaPicker: React.FC<MediaPickerProps> = ({ value, onChange }) => {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<button type="button" onClick={showDrawer}>
				Open media drawer
			</button>
			<Drawer
				title="Basic Drawer"
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
				zIndex={1025}
				width={400}
			>
				<div>input for media ... {value}</div>
			</Drawer>
		</>
	);
};

export default MediaPicker;
