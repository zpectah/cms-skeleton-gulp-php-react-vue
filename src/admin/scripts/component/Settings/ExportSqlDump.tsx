import React, { useState } from 'react';

import { useSystemApi } from '../../App/hooks';
import { Button } from '../ui';

interface ExportSqlDumpProps {}

const ExportSqlDump: React.FC<ExportSqlDumpProps> = ({}) => {
	const [progress, setProgress] = useState<boolean>(false);
	const { exportSqlDump } = useSystemApi();

	const processHandler = () => {
		setProgress(true);
		console.log('... processHandler ...');

		exportSqlDump({}).then((res) => {
			console.log('res ', res);
			setProgress(false);
		});
	};

	return (
		<tr>
			<th>Export data (test)</th>
			<td>
				<Button.Base
					type="primary"
					onClick={processHandler}
					loading={progress}
					ghost
				>
					Proceed
				</Button.Base>
			</td>
			<td>
				<small>
					TEST - Export all data and save as file .sql format - TEST
				</small>
			</td>
		</tr>
	);
};

export default ExportSqlDump;
