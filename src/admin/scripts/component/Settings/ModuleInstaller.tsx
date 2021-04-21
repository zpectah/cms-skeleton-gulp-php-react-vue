import React, { useState } from 'react';
import { Alert, message } from 'antd';
import styled from 'styled-components';

import { appProps } from '../../types';
import { Button } from '../ui';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	padding-bottom: 1rem;
`;
const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

interface ModuleInstallerProps {
	module: appProps['app'];
	afterInstall: Function;
	disabled?: boolean;
}

const ModuleInstaller: React.FC<ModuleInstallerProps> = (props) => {
	const { module, afterInstall, disabled = false } = props;
	const [progress, setProgress] = useState<boolean>(false);
	const installHandler = () => {
		setProgress(true);

		// TODO
		// request API

		setTimeout(() => {
			setProgress(false);
			afterInstall();
			message.success('Module was successfully installed', 2.5);
			// TODO: set error message when error from BE installation
		}, 1000);
	};

	return (
		<Wrapper>
			<Button.Base
				type="primary"
				onClick={installHandler}
				loading={progress}
				disabled={disabled}
			>
				Install {module} module
			</Button.Base>
			<Spacer />
			<Alert
				message="This is an irreversible step, continue only if you know what you are doing."
				type="info"
			/>
		</Wrapper>
	);
};

export default ModuleInstaller;
