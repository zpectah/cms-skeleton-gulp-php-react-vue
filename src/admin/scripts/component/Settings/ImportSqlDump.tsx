import React, { useState } from 'react';

import { useSystemApi } from '../../App/hooks';
import { Button } from '../ui';

interface ImportSqlDumpProps {}

const ImportSqlDump: React.FC<ImportSqlDumpProps> = ({}) => {
	const [progress, setProgress] = useState<boolean>(false);
	const { importSqlDump } = useSystemApi();

	const processHandler = () => {
		setProgress(true);
		console.log('... processHandler ...');

		importSqlDump({}).then((res) => {
			console.log('res ', res);
			setProgress(false);
		});
	};

	return (
		<tr>
			<th>Import data (test)</th>
			<td>
				<div>... select file ...</div>
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
					TEST - Import all data and save as file .sql format - TEST
				</small>
			</td>
		</tr>
	);
};

export default ImportSqlDump;
