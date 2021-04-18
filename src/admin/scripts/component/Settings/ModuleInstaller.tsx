import React, { useState } from 'react';
import styled from 'styled-components';

import { appProps } from '../../types';
import { Button } from '../ui';

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	padding-bottom: 1rem;
`;

interface ModuleInstallerProps {
	module: appProps['app'];
	disabled: boolean;
	afterInstall: Function;
}

const ModuleInstaller: React.FC<ModuleInstallerProps> = (props) => {
	const { module, disabled, afterInstall } = props;
	const [progress, setProgress] = useState<boolean>(false);
	const installHandler = () => {
		setProgress(true);

		// TODO
		// request API

		setTimeout(() => {
			setProgress(false);
			afterInstall();
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
		</Wrapper>
	);
};

export default ModuleInstaller;
