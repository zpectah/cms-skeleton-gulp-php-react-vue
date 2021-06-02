import config from '../config';

export default (ext) => {
	let type = 'undefined';

	if (config.OPTIONS.uploads.image.extension.indexOf(ext) !== -1)
		type = 'image';
	if (config.OPTIONS.uploads.audio.extension.indexOf(ext) !== -1)
		type = 'audio';
	if (config.OPTIONS.uploads.video.extension.indexOf(ext) !== -1)
		type = 'video';
	if (config.OPTIONS.uploads.document.extension.indexOf(ext) !== -1)
		type = 'document';
	if (config.OPTIONS.uploads.archive.extension.indexOf(ext) !== -1)
		type = 'archive';

	return type;
};
