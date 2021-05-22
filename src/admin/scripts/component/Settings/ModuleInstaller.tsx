import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, message } from 'antd';
import styled from 'styled-components';

import { appProps } from '../../types';
import { Button } from '../ui';
import { useSystemApi } from '../../App/hooks';

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
	const { t } = useTranslation(['component']);
	const { module, afterInstall, disabled = false } = props;
	const [progress, setProgress] = useState<boolean>(false);
	const { installModule } = useSystemApi();

	useEffect(() => {
		return () => {};
	}, []);

	const installHandler = () => {
		setProgress(true);

		installModule({ module: module }).then((res) => {
			console.log(res);

			if (afterInstall) afterInstall();
			setProgress(false);

			message.success(
				t('component:ModuleInstaller.message.success_installed'),
				2.5,
			);
		});
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
