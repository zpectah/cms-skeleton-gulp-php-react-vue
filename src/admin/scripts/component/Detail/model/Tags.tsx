import React from 'react';

interface TagsDetailProps {
	detailData: any;
	onCancel: Function;
	onSave: Function;
	onDelete: Function;
}

const TagsDetail: React.FC<TagsDetailProps> = (props) => {
	const { detailData, onCancel, onSave, onDelete } = props;

	return <>TagsDetail ... {JSON.stringify(detailData)}</>;
};

export default TagsDetail;
