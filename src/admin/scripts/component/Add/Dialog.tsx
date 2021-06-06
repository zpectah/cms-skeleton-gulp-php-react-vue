import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

import { ROUTE_PATH_SUFFIX_DETAIL } from '../../constants';
import navItems from '../../config.navItems';
import { Modal } from '../../component/ui';

interface AddDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
	afterClick: () => void;
}

const Dialog: React.FC<AddDialogProps> = (props) => {
	const { t } = useTranslation('common');
	const h = useHistory();
	const { isOpen, onCancel, afterClick } = props;

	const gridStyle: any = {
		width: '25%',
		textAlign: 'center',
	};

	const onClickHandler = (path) => {
		h.push(path + ROUTE_PATH_SUFFIX_DETAIL + '/new');
		afterClick();
	};

	return (
		<Modal.Base visible={isOpen} onCancel={onCancel}>
			<Modal.Header>... create new ...</Modal.Header>
			<Modal.Content>
				<Card>
					{navItems.add.map((item) => {
						if (item.active)
							return (
								<Card.Grid style={gridStyle} key={item.key}>
									<a onClick={() => onClickHandler(item.path)}>
										{t(item.label)}
									</a>
								</Card.Grid>
							);
					})}
				</Card>
			</Modal.Content>
		</Modal.Base>
	);
};

export default Dialog;
