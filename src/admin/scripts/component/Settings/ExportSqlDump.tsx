import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSystemApi, useProfile } from '../../App/hooks';
import { Button } from '../ui';

interface ExportSqlDumpProps {}

const ExportSqlDump: React.FC<ExportSqlDumpProps> = ({}) => {
	const [progress, setProgress] = useState<boolean>(false);
	const { t } = useTranslation(['component']);
	const { exportSqlDump } = useSystemApi();
	const { Profile } = useProfile();

	const processHandler = () => {
		const email = Profile.email;

		setProgress(true);

		exportSqlDump({ email }).then((res) => {
			if (res && res.url) window.open(res.url);
			setProgress(false);
		});
	};

	return (
		<tr>
			<th>{t('component:ExportSqlDump.label')}</th>
			<td>
				<Button.Base
					type="primary"
					onClick={processHandler}
					loading={progress}
					ghost
				>
					{t('component:ExportSqlDump.btn')}
				</Button.Base>
			</td>
			<td>
				<small>{t('component:ExportSqlDump.help')}</small>
			</td>
		</tr>
	);
};

export default ExportSqlDump;
