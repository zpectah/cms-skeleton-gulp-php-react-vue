import React from 'react';
import styled from 'styled-components';

import { appProps } from '../../types';

const Wrapper = styled.div``;

interface ModuleInstallerProps {
	module: appProps['app'];
}

const ModuleInstaller: React.FC<ModuleInstallerProps> = (props) => {
	const { module } = props;

	return <Wrapper>ModuleInstaller for: {module}</Wrapper>;
};

export default ModuleInstaller;
