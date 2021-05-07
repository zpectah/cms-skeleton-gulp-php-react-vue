export default (langList, langModel) => {
	let l = {};
	langList.map((lng) => {
		l[lng] = langModel;
	});

	return l;
};
