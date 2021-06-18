import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { Modal, Section, Button, Icon } from '../../component/ui';

const Content = styled.div``;

interface HelpDialogProps {
	isOpen: boolean;
	onCancel: (event) => void;
}

const Dialog: React.FC<HelpDialogProps> = (props) => {
	const { isOpen, onCancel } = props;
	const { t } = useTranslation(['common']);

	return (
		<Modal.Base visible={isOpen} onCancel={onCancel} size="xl">
			<Modal.Header>
				<div className="modal-heading-title">Help</div>
			</Modal.Header>
			<Modal.Content>
				<Content>
					<Section.Base title="Content" withBorder>
						...
					</Section.Base>
					<Section.Base title="User levels" withBorder>
						<div>
							<table>
								<thead>
									<tr>
										<th>&nbsp;</th>
										<th>Dashboard, Profile, Help</th>
										<th>Posts, Tags, Categories, Uploads</th>
										<th>Translations, Pages, Menu, Modules</th>
										<th>Settings</th>
										<th>Users</th>
										<th>Messages, Requests</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>Redactor</th>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<th>Chief Redactor (Manager)</th>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<th>Admin</th>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>(true)</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
									</tr>
									<tr>
										<th>Super Admin</th>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
										<td>
											<Icon.Material type="Check" size={15} />
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Section.Base>
					<Section.Base>...</Section.Base>
				</Content>
			</Modal.Content>
			<Modal.Footer>
				<div className="modal-footer-block">
					<Button.Base onClick={onCancel}>{t('btn.close')}</Button.Base>
				</div>
			</Modal.Footer>
		</Modal.Base>
	);
};

export default Dialog;
