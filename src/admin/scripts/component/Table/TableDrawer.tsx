import React, { useState } from 'react';
import { Drawer } from 'antd';

import { Button } from '../ui';

interface TableDrawerProps {}

const TableDrawer: React.FC<TableDrawerProps> = ({ children }) => {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Button.Base type="primary" onClick={showDrawer} ghost>
				Table options
			</Button.Base>
			<Drawer
				title="Table options"
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
				children={children}
				width={400}
			/>
		</>
	);
};

export default TableDrawer;
