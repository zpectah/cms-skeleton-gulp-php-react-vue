import React from 'react';
import { Spin } from 'antd';

const PreloaderBlock: React.FC<{}> = () => {
	return (
		<>
			<Spin />
		</>
	);
};

export default PreloaderBlock;
