import React, { useState } from 'react';

import { useSystemApi } from '../../App/hooks';
import { Button } from '../ui';

interface RepairSqlTablesProps {}

const RepairSqlTables: React.FC<RepairSqlTablesProps> = ({}) => {
	const [progress, setProgress] = useState<boolean>(false);
	const { repairLanguageTables } = useSystemApi();

	const processHandler = () => {
		setProgress(true);
		console.log('... processHandler ...');

		repairLanguageTables({}).then((res) => {
			console.log('res ', res);
			setProgress(false);
		});
	};

	return (
		<tr>
			<th>Repair missing language content</th>
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
					Iterate all language content and create missing rows in database
				</small>
			</td>
		</tr>
	);
};

export default RepairSqlTables;
