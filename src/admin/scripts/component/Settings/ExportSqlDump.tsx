import React, { useState } from 'react';

import { useSystemApi } from '../../App/hooks';
import { Button } from '../ui';

interface ExportSqlDumpProps {}

const ExportSqlDump: React.FC<ExportSqlDumpProps> = ({}) => {
	const [progress, setProgress] = useState<boolean>(false);
	const { exportSqlDump } = useSystemApi();

	const processHandler = () => {
		setProgress(true);

		exportSqlDump({}).then((res) => {
			if (res && res.url) window.open(res.url);
			setProgress(false);
		});
	};

	return (
		<tr>
			<th>Export data tables</th>
			<td>
				<Button.Base
					type="primary"
					onClick={processHandler}
					loading={progress}
					ghost
				>
					Export SQL
				</Button.Base>
			</td>
			<td>
				<small>Export all data and save as file .sql format</small>
			</td>
		</tr>
	);
};

export default ExportSqlDump;
