import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

import { ROUTE_PATH_SUFFIX_DETAIL, NAV_ITEMS } from '../../constants';
import { Modal } from '../../component/ui';
import { useProfile } from '../../App/hooks';

interface AddDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
	afterClick: () => void;
}

const Dialog: React.FC<AddDialogProps> = ({ isOpen, onCancel, afterClick }) => {
	const { t } = useTranslation('common');
	const h = useHistory();
	const { userShouldShow } = useProfile();

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
					{NAV_ITEMS.add.map((item) => {
						if (item.active && userShouldShow(item.auth))
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
