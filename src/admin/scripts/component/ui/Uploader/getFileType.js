import OPTIONS from '../../../../../config/options.json';

export default (ext) => {
	let type = 'undefined';

	if (OPTIONS.uploads.image.extension.indexOf(ext) !== -1) type = 'image';
	if (OPTIONS.uploads.audio.extension.indexOf(ext) !== -1) type = 'audio';
	if (OPTIONS.uploads.video.extension.indexOf(ext) !== -1) type = 'video';
	if (OPTIONS.uploads.document.extension.indexOf(ext) !== -1) type = 'document';
	if (OPTIONS.uploads.archive.extension.indexOf(ext) !== -1) type = 'archive';

	return type;
};
