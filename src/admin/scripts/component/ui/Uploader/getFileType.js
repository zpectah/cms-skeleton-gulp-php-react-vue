import OPTIONS from '../../../../../config/options.json';

export default (ext) => {
	let type = 'undefined';

	switch (ext) {
		case 'jpg':
		case 'jpeg':
		case 'png':
			type = 'image';
			break;

		case 'mp3':
		case 'aac':
			type = 'audio';
			break;

		case 'mpeg':
		case 'mp4':
			type = 'video';
			break;

		case 'doc':
		case 'docx':
		case 'xls':
		case 'xlsx':
		case 'ppt':
		case 'pptx':
		case 'pages':
		case 'numbers':
		case 'pdf':
		case 'pps':
		case 'ppsx':
			type = 'document';
			break;

		case 'zip':
		case 'rar':
			type = 'archive';
			break;
	}

	return type;
};
