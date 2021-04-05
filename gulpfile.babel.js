import { src, dest, series, parallel, watch } from 'gulp';
import colors from 'colors';
import del from 'del';
import gulpReplace from 'gulp-replace';
import gulpRename from 'gulp-rename';
import gulpHtmlMin from 'gulp-htmlmin';
import gulpJsonMinify from 'gulp-jsonminify';
import gulpImageMin from 'gulp-imagemin';
import babelify from 'babelify';
import gulpBro from 'gulp-bro';
import gulpMinify from 'gulp-minify';
import gulpSourceMaps from 'gulp-sourcemaps';
import tsify from 'tsify';
import gulpSass from 'gulp-sass';
import gulpCleanCss from 'gulp-clean-css';
import gulpCssImport from 'gulp-cssimport';

import { date } from 'javascript-es6-helpers';
import CFG from './dev.config.json';

const ROOT = CFG.PATH_BASE;
const PATH_SRC = ROOT + CFG.PATH_SOURCE;
const PATH_DEV = ROOT + CFG.PATH_DEVELOPMENT;
const PATH_PROD = ROOT + CFG.PATH_PRODUCTION;

const utils = {
	getPathSuffix: () => {
		let path = '**/*';
		if (!CFG.CLEAN_WITH_LOGS && CFG.CLEAN_WITH_UPLOADS) {
			path = `!(${CFG.FOLDER_LOGS}*)**/*`;
		} else if (CFG.CLEAN_WITH_LOGS && !CFG.CLEAN_WITH_UPLOADS) {
			path = `!(${CFG.FOLDER_UPLOADS}**/*)**/*`;
		} else if (!CFG.CLEAN_WITH_LOGS && !CFG.CLEAN_WITH_UPLOADS) {
			path = `!(${CFG.FOLDER_UPLOADS}**/*)(${CFG.FOLDER_LOGS}*)**/*`;
		}

		return path;
	},
};
const options = {
	Html: {
		htmlMin: {
			collapseWhitespace: true,
			removeComments: true,
		},
	},
	Scripts: {
		Admin: {
			babelify: {
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: [],
			},
		},
		Web: {
			babelify: {
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: [],
			},
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		sourcemaps: {
			largeFile: true,
		},
		minify: {
			ext: {
				min: '.min.js',
			},
			preserveComments: 'all',
		},
		debug_dev: false,
		debug_prod: true,
	},
	Styles: {
		cleanCss: {
			compatibility: 'ie9',
		},
		rename: {
			suffix: '.min',
		},
	},
	Watch: {
		watch: {
			events: 'all',
		},
	},
};
const source = {
	Common: {
		php: [PATH_SRC + '**/*.php', PATH_SRC + '**/.htaccess'],
		etc: [PATH_SRC + '**/*.txt', PATH_SRC + '**/*.xml'],
	},
};

// const _Message = {
// 	afterInstall: function (cb) {
// 		cb(console.log(` NPM packages was created/updated `.bgYellow.black));
// 	},
// };

const _Clean = {
	clean_dev: function (cb) {
		del.sync(
			PATH_DEV + utils.getPathSuffix(),
			cb(console.log(` Folder 'dev/' was cleared `.bgYellow.black)),
		);
	},
	clean_prod: function (cb) {
		del.sync(
			PATH_PROD + utils.getPathSuffix(),
			cb(console.log(` Folder 'prod/' was cleared `.bgYellow.black)),
		);
	},
};

const _Environment = {
	environment_dev: function (cb) {
		src(ROOT + CFG.ENV_INPUT_FILE)
			.pipe(gulpReplace(CFG.KEY_ENV_ENV, CFG.ENV_NAME_DEV))
			.pipe(gulpReplace(CFG.KEY_ENV_TIMESTAMP, date.getTimestampString()))
			.pipe(gulpRename(CFG.ENV_OUTPUT_FILE))
			.pipe(dest(PATH_DEV + CFG.FOLDER_CONFIG));
		cb(
			console.log(
				` New environmental file for 'dev' was created `.bgYellow.black,
			),
		);
	},
	environment_prod: function (cb) {
		src(ROOT + CFG.ENV_INPUT_FILE)
			.pipe(gulpReplace(CFG.KEY_ENV_ENV, CFG.ENV_NAME_PROD))
			.pipe(gulpReplace(CFG.KEY_ENV_TIMESTAMP, date.getTimestampString()))
			.pipe(gulpRename(CFG.ENV_OUTPUT_FILE))
			.pipe(dest(PATH_PROD + CFG.FOLDER_CONFIG));
		cb(
			console.log(
				` New environmental file for 'prod' was created `.bgYellow.black,
			),
		);
	},
};

const _Common = {
	// PHP files
	php_dev: function (cb) {
		src([...source.Common.php, ...source.Common.etc]).pipe(dest(PATH_DEV));
		cb();
	},
	php_prod: function (cb) {
		src(source.Common.php).pipe(dest(PATH_PROD));
		cb();
	},

	// HTML files
	html_dev: function (cb) {
		src([PATH_SRC + '**/*.html']).pipe(dest(PATH_DEV));
		cb();
	},
	html_prod: function (cb) {
		src([PATH_SRC + '**/*.html'])
			.pipe(gulpHtmlMin(options.Html.htmlMin))
			.pipe(dest(PATH_PROD));
		cb();
	},

	// JSON files
	json_dev: function (cb) {
		src([`${PATH_SRC}**/*.json`, `!${PATH_SRC}**/scripts/**/*.json`]).pipe(
			dest(PATH_DEV),
		);
		cb();
	},
	json_prod: function (cb) {
		src([`${PATH_SRC}**/*.json`, `!${PATH_SRC}**/scripts/**/*.json`])
			.pipe(gulpJsonMinify({}))
			.pipe(dest(PATH_PROD));
		cb();
	},

	// IMAGE files
	images_dev: function (cb) {
		src(PATH_SRC + CFG.FOLDER_STYLES_IMAGES + '**/*').pipe(
			dest(PATH_DEV + CFG.FOLDER_STYLES_IMAGES),
		);
		src(PATH_SRC + CFG.FOLDER_STATIC_IMAGES + '**/*').pipe(
			dest(PATH_DEV + CFG.FOLDER_STATIC_IMAGES),
		);
		cb();
	},
	images_prod: function (cb) {
		src(PATH_SRC + CFG.FOLDER_STYLES_IMAGES + '**/*')
			.pipe(gulpImageMin({}))
			.pipe(dest(PATH_PROD + CFG.FOLDER_STYLES_IMAGES));
		src(PATH_SRC + CFG.FOLDER_STATIC_IMAGES + '**/*')
			.pipe(gulpImageMin({}))
			.pipe(dest(PATH_PROD + CFG.FOLDER_STATIC_IMAGES));
		cb();
	},

	// static/ folder
	static_dev: function (cb) {
		src(PATH_SRC + CFG.FOLDER_STATIC + '**/*').pipe(
			dest(PATH_DEV + CFG.FOLDER_STATIC),
		);
		cb();
	},
	static_prod: function (cb) {
		src(PATH_SRC + CFG.FOLDER_STATIC + '**/*').pipe(
			dest(PATH_PROD + CFG.FOLDER_STATIC),
		);
		cb();
	},

	// **/styles/fonts/ folder
	fonts_dev: function (cb) {
		src(PATH_SRC + '**/' + CFG.FOLDER_FONTS + '**/*').pipe(
			dest(PATH_DEV + '**/' + CFG.FOLDER_FONTS),
		);
		cb();
	},
	fonts_prod: function (cb) {
		src(PATH_SRC + '**/' + CFG.FOLDER_FONTS + '**/*').pipe(
			dest(PATH_PROD + '**/' + CFG.FOLDER_FONTS),
		);
		cb();
	},
};

const _Scripts = {
	scriptsAdmin_dev: function (cb) {
		src(
			PATH_SRC + CFG.FOLDER_ADMIN + CFG.FOLDER_SCRIPTS + CFG.SCRIPTS_INPUT_FILE,
		)
			.pipe(
				gulpBro({
					plugin: [tsify],
					transform: [babelify.configure(options.Scripts.Admin.babelify)],
					extensions: options.Scripts.extensions,
					debug: options.Scripts.debug_dev,
				}),
			)
			.pipe(dest(PATH_DEV + CFG.FOLDER_ADMIN + CFG.FOLDER_SCRIPTS));
		cb();
	},
	scriptsWeb_dev: function (cb) {
		src(PATH_SRC + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS + CFG.SCRIPTS_INPUT_FILE)
			.pipe(
				gulpBro({
					plugin: [tsify],
					transform: [babelify.configure(options.Scripts.Admin.babelify)],
					extensions: options.Scripts.extensions,
					debug: options.Scripts.debug_dev,
				}),
			)
			.pipe(dest(PATH_DEV + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS));
		cb();
	},
	scriptsAdmin_prod: function (cb) {
		src(
			PATH_SRC + CFG.FOLDER_ADMIN + CFG.FOLDER_SCRIPTS + CFG.SCRIPTS_INPUT_FILE,
		)
			.pipe(gulpSourceMaps.init(options.Scripts.sourcemaps))
			.pipe(
				gulpBro({
					plugin: [tsify],
					transform: [babelify.configure(options.Scripts.Admin.babelify)],
					extensions: options.Scripts.extensions,
					debug: options.Scripts.debug_prod,
				}),
			)
			.pipe(dest(PATH_PROD + CFG.FOLDER_ADMIN + CFG.FOLDER_SCRIPTS))
			.pipe(gulpMinify(options.Scripts.minify))
			.pipe(gulpSourceMaps.write())
			.pipe(dest(PATH_PROD + CFG.FOLDER_ADMIN + CFG.FOLDER_SCRIPTS));
		cb();
	},
	scriptsWeb_prod: function (cb) {
		src(PATH_SRC + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS + CFG.SCRIPTS_INPUT_FILE)
			.pipe(gulpSourceMaps.init(options.Scripts.sourcemaps))
			.pipe(
				gulpBro({
					plugin: [tsify],
					transform: [babelify.configure(options.Scripts.Admin.babelify)],
					extensions: options.Scripts.extensions,
					debug: options.Scripts.debug_prod,
				}),
			)
			.pipe(dest(PATH_PROD + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS))
			.pipe(gulpMinify(options.Scripts.minify))
			.pipe(gulpSourceMaps.write())
			.pipe(dest(PATH_PROD + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS));
		cb();
	},
};

const _Styles = {
	stylesAdmin_dev: function (cb) {
		if (CFG.ADMIN_EXTERNAL_CSS) {
			src(
				PATH_SRC +
					CFG.FOLDER_ADMIN +
					CFG.FOLDER_STYLES_INPUT +
					CFG.STYLES_INPUT_FILE,
			)
				.pipe(gulpSass({}).on('error', gulpSass.logError))
				.pipe(gulpCssImport({}))
				.pipe(dest(PATH_DEV + CFG.FOLDER_ADMIN + CFG.FOLDER_STYLES_OUTPUT));
			cb();
		} else {
			cb();
		}
	},
	stylesWeb_dev: function (cb) {
		if (CFG.WEB_EXTERNAL_CSS) {
			src(
				PATH_SRC +
					CFG.FOLDER_WEB +
					CFG.FOLDER_STYLES_INPUT +
					CFG.STYLES_INPUT_FILE,
			)
				.pipe(gulpSass({}).on('error', gulpSass.logError))
				.pipe(gulpCssImport({}))
				.pipe(dest(PATH_DEV + CFG.FOLDER_WEB + CFG.FOLDER_STYLES_OUTPUT));
			cb();
		} else {
			cb();
		}
	},
	stylesAdmin_prod: function (cb) {
		if (CFG.ADMIN_EXTERNAL_CSS) {
			src(
				PATH_SRC +
					CFG.FOLDER_ADMIN +
					CFG.FOLDER_STYLES_INPUT +
					CFG.STYLES_INPUT_FILE,
			)
				.pipe(gulpSourceMaps.init({}))
				.pipe(gulpSass({}).on('error', gulpSass.logError))
				.pipe(gulpCssImport({}))
				.pipe(dest(PATH_PROD + CFG.FOLDER_ADMIN + CFG.FOLDER_STYLES_OUTPUT))
				.pipe(gulpCleanCss(options.Styles.cleanCss))
				.pipe(gulpRename(options.Styles.rename))
				.pipe(gulpSourceMaps.write())
				.pipe(dest(PATH_PROD + CFG.FOLDER_ADMIN + CFG.FOLDER_STYLES_OUTPUT));
			cb();
		} else {
			cb();
		}
	},
	stylesWeb_prod: function (cb) {
		if (CFG.WEB_EXTERNAL_CSS) {
			src(
				PATH_SRC +
					CFG.FOLDER_WEB +
					CFG.FOLDER_STYLES_INPUT +
					CFG.STYLES_INPUT_FILE,
			)
				.pipe(gulpSourceMaps.init({}))
				.pipe(gulpSass({}).on('error', gulpSass.logError))
				.pipe(gulpCssImport({}))
				.pipe(dest(PATH_PROD + CFG.FOLDER_WEB + CFG.FOLDER_STYLES_OUTPUT))
				.pipe(gulpCleanCss(options.Styles.cleanCss))
				.pipe(gulpRename(options.Styles.rename))
				.pipe(gulpSourceMaps.write())
				.pipe(dest(PATH_PROD + CFG.FOLDER_WEB + CFG.FOLDER_STYLES_OUTPUT));
			cb();
		} else {
			cb();
		}
	},
};

const TaskWatch = {
	admin: function (cb) {
		watch(
			[
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.html',
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.htm',
			],
			options.Watch.watch,
			_Common.html_dev,
		);
		watch(
			[
				`${PATH_SRC}${CFG.FOLDER_ADMIN}**/*.json`,
				`!${PATH_SRC}${CFG.FOLDER_ADMIN}**/scripts/**/*.json`,
			],
			options.Watch.watch,
			_Common.json_dev,
		);
		watch(
			[PATH_SRC + CFG.FOLDER_ADMIN + `${CFG.FOLDER_STYLES_IMAGES}**/*`],
			options.Watch.watch,
			_Common.images_dev,
		);
		watch(
			[
				`!(${CFG.FOLDER_VENDOR}*)/**/*`,
				...source.Common.php,
				...source.Common.etc,
			],
			options.Watch.watch,
			_Common.php_dev,
		);
		watch(
			[PATH_SRC + CFG.FOLDER_ADMIN + `${CFG.FOLDER_FONTS}**/*`],
			options.Watch.watch,
			_Common.fonts_dev,
		);
		watch(
			[PATH_SRC + CFG.FOLDER_STATIC + '**/*'],
			options.Watch.watch,
			_Common.static_dev,
		);
		watch(
			[
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.js',
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.jsx',
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.ts',
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.tsx',
				`${PATH_SRC}${CFG.FOLDER_ADMIN}**/scripts/**/*.json`,
			],
			options.Watch.watch,
			_Scripts.scriptsAdmin_dev,
		);
		if (CFG.ADMIN_EXTERNAL_CSS)
			watch(
				[PATH_SRC + CFG.FOLDER_ADMIN + `${CFG.FOLDER_STYLES_INPUT}**/*.scss`],
				options.Watch.watch,
				_Styles.stylesAdmin_dev,
			);

		cb(
			console.log(
				` Watching changes in 'admin/' and backend files. You should reload browser manually. `
					.bgYellow.black,
			),
		);
	},
	web: function (cb) {
		watch(
			[
				PATH_SRC + CFG.FOLDER_WEB + '**/*.html',
				PATH_SRC + CFG.FOLDER_WEB + '**/*.htm',
			],
			options.Watch.watch,
			_Common.html_dev,
		);
		watch(
			[PATH_SRC + CFG.FOLDER_WEB + '**/*.json'],
			options.Watch.watch,
			_Common.json_dev,
		);
		watch(
			[PATH_SRC + CFG.FOLDER_WEB + `${CFG.FOLDER_STYLES_IMAGES}**/*`],
			options.Watch.watch,
			_Common.images_dev,
		);
		watch(
			[PATH_SRC + CFG.FOLDER_WEB + `${CFG.FOLDER_FONTS}**/*`],
			options.Watch.watch,
			_Common.fonts_dev,
		);
		watch(
			[
				PATH_SRC + CFG.FOLDER_WEB + '**/*.js',
				PATH_SRC + CFG.FOLDER_WEB + '**/*.jsx',
				PATH_SRC + CFG.FOLDER_WEB + '**/*.ts',
				PATH_SRC + CFG.FOLDER_WEB + '**/*.tsx',
			],
			options.Watch.watch,
			_Scripts.scriptsWeb_dev,
		);
		watch(
			[PATH_SRC + CFG.FOLDER_WEB + `${CFG.FOLDER_STYLES_INPUT}**/*.scss`],
			options.Watch.watch,
			_Styles.stylesWeb_dev,
		);

		cb(
			console.log(
				` Watching changes in 'web/' files. You should reload browser manually. `
					.bgYellow.black,
			),
		);
	},
	all: function (cb) {
		watch(
			[PATH_SRC + '**/*.html', PATH_SRC + '**/*.htm'],
			options.Watch.watch,
			_Common.html_dev,
		);
		watch(
			[
				`${PATH_SRC}${CFG.FOLDER_ADMIN}**/*.json`,
				`!${PATH_SRC}${CFG.FOLDER_ADMIN}**/scripts/**/*.json`,
			],
			options.Watch.watch,
			_Common.json_dev,
		);
		watch(
			[PATH_SRC + `**/${CFG.FOLDER_STYLES_IMAGES}**/*`],
			options.Watch.watch,
			_Common.images_dev,
		);
		watch(
			[
				`!(${CFG.FOLDER_VENDOR}*)/**/*`,
				...source.Common.php,
				...source.Common.etc,
			],
			options.Watch.watch,
			_Common.php_dev,
		);
		watch(
			[PATH_SRC + `**/${CFG.FOLDER_FONTS}**/*`],
			options.Watch.watch,
			_Common.fonts_dev,
		);
		watch(
			[PATH_SRC + CFG.FOLDER_STATIC + '**/*'],
			options.Watch.watch,
			_Common.static_dev,
		);
		watch(
			[
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.js',
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.jsx',
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.ts',
				PATH_SRC + CFG.FOLDER_ADMIN + '**/*.tsx',
				`${PATH_SRC}${CFG.FOLDER_ADMIN}**/scripts/**/*.json`,
			],
			options.Watch.watch,
			_Scripts.scriptsAdmin_dev,
		);
		watch(
			[
				PATH_SRC + CFG.FOLDER_WEB + '**/*.js',
				PATH_SRC + CFG.FOLDER_WEB + '**/*.jsx',
				PATH_SRC + CFG.FOLDER_WEB + '**/*.ts',
				PATH_SRC + CFG.FOLDER_WEB + '**/*.tsx',
			],
			options.Watch.watch,
			_Scripts.scriptsWeb_dev,
		);
		if (CFG.ADMIN_EXTERNAL_CSS)
			watch(
				[PATH_SRC + CFG.FOLDER_ADMIN + `${CFG.FOLDER_STYLES_INPUT}**/*.scss`],
				options.Watch.watch,
				_Styles.stylesAdmin_dev,
			);
		watch(
			[PATH_SRC + CFG.FOLDER_WEB + `${CFG.FOLDER_STYLES_INPUT}**/*.scss`],
			options.Watch.watch,
			_Styles.stylesWeb_dev,
		);
		cb(
			console.log(
				` Watching changes in whole project structure. You should reload browser manually. `
					.bgYellow.black,
			),
		);
	},
};

const TaskDev = series(
	_Clean.clean_dev,
	parallel(
		_Common.php_dev,
		_Common.html_dev,
		_Common.json_dev,
		_Common.images_dev,
		_Common.static_dev,
		_Common.fonts_dev,
		_Scripts.scriptsAdmin_dev,
		_Scripts.scriptsWeb_dev,
		_Styles.stylesAdmin_dev,
		_Styles.stylesWeb_dev,
	),
	_Environment.environment_dev,
);

const TaskBuild = series(
	_Clean.clean_prod,
	parallel(
		_Common.php_prod,
		_Common.html_prod,
		_Common.json_prod,
		_Common.images_prod,
		_Common.static_prod,
		_Common.fonts_prod,
		_Scripts.scriptsAdmin_prod,
		_Scripts.scriptsWeb_prod,
		_Styles.stylesAdmin_prod,
		_Styles.stylesWeb_prod,
	),
	_Environment.environment_prod,
);

// export const after_install = series(_Message.afterInstall);

export const dev = series(TaskDev);
export const start = series(TaskDev, TaskWatch.all);
export const start_admin = series(TaskDev, TaskWatch.admin);
export const start_web = series(TaskDev, TaskWatch.web);
export const build = series(TaskDev, TaskBuild);
export const build_dev = series(TaskDev);
export const build_prod = series(TaskBuild);

export default dev;
