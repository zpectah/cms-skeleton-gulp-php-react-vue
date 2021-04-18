import React from 'react';

interface UsersDetailProps {
	detailData: any;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const UsersDetail: React.FC<UsersDetailProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;

	return <>UsersDetail ... {JSON.stringify(detailData)}</>;
};

export default UsersDetail;
