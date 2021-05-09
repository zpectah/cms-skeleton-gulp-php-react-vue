import { src, dest, series, parallel, watch } from 'gulp';
import colors from 'colors';
import cliProgress from 'cli-progress';
import del from 'del';
import browserify from 'browserify';
import tsify from 'tsify';
import vinylSource from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';
import gulpReplace from 'gulp-replace';
import gulpRename from 'gulp-rename';
import gulpHtmlMin from 'gulp-htmlmin';
import gulpJsonMinify from 'gulp-jsonminify';
import gulpImageMin from 'gulp-imagemin';
import babelify from 'babelify';
import gulpUglify from 'gulp-uglify';
import gulpSourceMaps from 'gulp-sourcemaps';
import gulpSass from 'gulp-sass';
import gulpCleanCss from 'gulp-clean-css';
import gulpCssImport from 'gulp-cssimport';

import { date } from './src/libs/js/utils';
import CFG from './dev.config.json';

const ROOT = CFG.PATH_BASE;
const PATH_SRC = ROOT + CFG.PATH_SOURCE;
const PATH_DEV = ROOT + CFG.PATH_DEVELOPMENT;
const PATH_TEST = ROOT + CFG.PATH_TEST;
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
				plugins: ['@babel/plugin-transform-runtime'],
			},
		},
		Web: {
			babelify: {
				presets: ['@babel/preset-env', '@babel/preset-react'],
				plugins: ['@babel/plugin-transform-runtime'],
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
		debug_test: false,
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
		watch: {},
	},
};

const source = {
	Common: {
		php: [PATH_SRC + '**/*.php', PATH_SRC + '**/.htaccess'],
		etc: [PATH_SRC + '**/*.txt', PATH_SRC + '**/*.xml'],
	},
};

const progress = new cliProgress.SingleBar({
	format:
		'# ' +
		colors.grey('Building') +
		' ' +
		colors.yellow('{env}') +
		' | ' +
		colors.grey('Tasks') +
		' ' +
		colors.yellow('{value}/{total}') +
		' |' +
		colors.bgBlack.white('{bar}') +
		'| ' +
		colors.yellow('{percentage}%'),
	barCompleteChar: '\u2588',
	barIncompleteChar: '—',
	hideCursor: true,
});

const watchSource = {
	html: [
		PATH_SRC + CFG.FOLDER_ADMIN + '**/*.html',
		PATH_SRC + CFG.FOLDER_ADMIN + '**/*.htm',
	],
	json: [
		`${PATH_SRC}${CFG.FOLDER_ADMIN}**/*.json`,
		`!${PATH_SRC}${CFG.FOLDER_ADMIN}**/scripts/**/*.json`,
	],
	images: [PATH_SRC + CFG.FOLDER_ADMIN + `${CFG.FOLDER_STYLES_IMAGES}**/*`],
	php: [
		`!(${CFG.FOLDER_VENDOR}*)/**/*`,
		...source.Common.php,
		...source.Common.etc,
	],
	fonts: {
		admin: [PATH_SRC + CFG.FOLDER_ADMIN + `${CFG.FOLDER_FONTS}**/*`],
		web: [PATH_SRC + CFG.FOLDER_WEB + `${CFG.FOLDER_FONTS}**/*`],
	},
	static: [PATH_SRC + CFG.FOLDER_STATIC + '**/*'],
	scripts: {
		admin: [
			PATH_SRC + CFG.FOLDER_ADMIN + '**/*.js',
			PATH_SRC + CFG.FOLDER_ADMIN + '**/*.jsx',
			PATH_SRC + CFG.FOLDER_ADMIN + '**/*.ts',
			PATH_SRC + CFG.FOLDER_ADMIN + '**/*.tsx',
			`${PATH_SRC}${CFG.FOLDER_ADMIN}**/scripts/**/*.json`,
		],
		web: [
			PATH_SRC + CFG.FOLDER_WEB + '**/*.js',
			PATH_SRC + CFG.FOLDER_WEB + '**/*.jsx',
			PATH_SRC + CFG.FOLDER_WEB + '**/*.ts',
			PATH_SRC + CFG.FOLDER_WEB + '**/*.tsx',
		],
	},
	styles: {
		admin: [
			PATH_SRC + CFG.FOLDER_ADMIN + `${CFG.FOLDER_STYLES_INPUT}**/*.scss`,
		],
		web: [PATH_SRC + CFG.FOLDER_WEB + `${CFG.FOLDER_STYLES_INPUT}**/*.scss`],
	},
};

const task = {
	clean: function (cb, path) {
		progress.start(12, 1, { env: 'DEV' });
		return del.sync(path + utils.getPathSuffix(), cb());
	},
	environment: function (cb, env, path) {
		progress.increment();
		src(ROOT + CFG.ENV_INPUT_FILE)
			.pipe(gulpReplace(CFG.KEY_ENV_ENV, env))
			.pipe(gulpReplace(CFG.KEY_ENV_TIMESTAMP, date.getTimestampString()))
			.pipe(gulpRename(CFG.ENV_OUTPUT_FILE))
			.pipe(dest(path));
		cb(progress.stop());
	},
	commonPhp: function (path) {
		progress.increment();
		return src([...source.Common.php, ...source.Common.etc]).pipe(dest(path));
	},
	commonStatic: function (path) {
		progress.increment();
		return src(PATH_SRC + CFG.FOLDER_STATIC + '**/*').pipe(dest(path));
	},
	commonFonts: function (path) {
		progress.increment();
		return src(PATH_SRC + '**/' + CFG.FOLDER_FONTS + '**/*').pipe(
			dest(path + '**/' + CFG.FOLDER_FONTS),
		);
	},
	scriptsAdmin: function (env, path) {
		process.env.NODE_ENV = env;
		progress.increment();
		return browserify({
			entries: [
				PATH_SRC +
					CFG.FOLDER_ADMIN +
					CFG.FOLDER_SCRIPTS +
					CFG.SCRIPTS_INPUT_FILE,
			],
			extensions: options.Scripts.extensions,
		})
			.plugin(tsify)
			.transform(babelify.configure(options.Scripts.Admin.babelify))
			.bundle()
			.pipe(vinylSource('index.js'))
			.pipe(dest(path));
	},
	scriptsWeb: function (env, path) {
		process.env.NODE_ENV = env;
		progress.increment();
		return browserify({
			entries: [
				PATH_SRC + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS + CFG.SCRIPTS_INPUT_FILE,
			],
			extensions: options.Scripts.extensions,
		})
			.plugin(tsify)
			.transform(babelify.configure(options.Scripts.Admin.babelify))
			.bundle()
			.pipe(vinylSource('index.js'))
			.pipe(dest(path));
	},
	scriptsAdminBuild: function (env, path) {
		process.env.NODE_ENV = env;
		progress.increment();
		return browserify({
			entries: [
				PATH_SRC +
					CFG.FOLDER_ADMIN +
					CFG.FOLDER_SCRIPTS +
					CFG.SCRIPTS_INPUT_FILE,
			],
			extensions: options.Scripts.extensions,
		})
			.plugin(tsify)
			.transform(babelify.configure(options.Scripts.Admin.babelify))
			.bundle()
			.pipe(vinylSource('index.js'))
			.pipe(dest(path))
			.pipe(vinylBuffer())
			.pipe(gulpSourceMaps.init(options.Scripts.sourcemaps))
			.pipe(gulpRename({ extname: '.min.js' }))
			.pipe(gulpUglify())
			.pipe(gulpSourceMaps.write())
			.pipe(dest(path));
	},
	scriptsWebBuild: function (env, path) {
		process.env.NODE_ENV = env;
		progress.increment();
		return browserify({
			entries: [
				PATH_SRC + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS + CFG.SCRIPTS_INPUT_FILE,
			],
			extensions: options.Scripts.extensions,
		})
			.plugin(tsify)
			.transform(babelify.configure(options.Scripts.Admin.babelify))
			.bundle()
			.pipe(vinylSource('index.js'))
			.pipe(dest(path))
			.pipe(vinylBuffer())
			.pipe(gulpSourceMaps.init(options.Scripts.sourcemaps))
			.pipe(gulpRename({ extname: '.min.js' }))
			.pipe(gulpUglify())
			.pipe(gulpSourceMaps.write())
			.pipe(dest(path));
	},
	stylesAdmin: function (path) {
		progress.increment();
		if (CFG.ADMIN_EXTERNAL_CSS) {
			return src(
				PATH_SRC +
					CFG.FOLDER_ADMIN +
					CFG.FOLDER_STYLES_INPUT +
					CFG.STYLES_INPUT_FILE,
			)
				.pipe(gulpSass({}).on('error', gulpSass.logError))
				.pipe(gulpCssImport({}))
				.pipe(dest(path));
		}
	},
	stylesWeb: function (path) {
		progress.increment();
		if (CFG.WEB_EXTERNAL_CSS) {
			return src(
				PATH_SRC +
					CFG.FOLDER_WEB +
					CFG.FOLDER_STYLES_INPUT +
					CFG.STYLES_INPUT_FILE,
			)
				.pipe(gulpSass({}).on('error', gulpSass.logError))
				.pipe(gulpCssImport({}))
				.pipe(dest(path));
		}
	},
	stylesAdminBuild: function (path) {
		progress.increment();
		if (CFG.ADMIN_EXTERNAL_CSS) {
			return src(
				PATH_SRC +
					CFG.FOLDER_ADMIN +
					CFG.FOLDER_STYLES_INPUT +
					CFG.STYLES_INPUT_FILE,
			)
				.pipe(gulpSourceMaps.init({}))
				.pipe(gulpSass({}).on('error', gulpSass.logError))
				.pipe(gulpCssImport({}))
				.pipe(dest(path))
				.pipe(gulpCleanCss(options.Styles.cleanCss))
				.pipe(gulpRename(options.Styles.rename))
				.pipe(gulpSourceMaps.write())
				.pipe(dest(path));
		}
	},
	stylesWebBuild: function (path) {
		progress.increment();
		if (CFG.WEB_EXTERNAL_CSS) {
			return src(
				PATH_SRC +
					CFG.FOLDER_WEB +
					CFG.FOLDER_STYLES_INPUT +
					CFG.STYLES_INPUT_FILE,
			)
				.pipe(gulpSourceMaps.init({}))
				.pipe(gulpSass({}).on('error', gulpSass.logError))
				.pipe(gulpCssImport({}))
				.pipe(dest(path))
				.pipe(gulpCleanCss(options.Styles.cleanCss))
				.pipe(gulpRename(options.Styles.rename))
				.pipe(gulpSourceMaps.write())
				.pipe(dest(path));
		}
	},
};

const Clean = {
	clean_dev: (cb) => task.clean(cb, PATH_DEV),
	clean_test: (cb) => task.clean(cb, PATH_TEST),
	clean_prod: (cb) => task.clean(cb, PATH_PROD),
};

const Environment = {
	environment_dev: (cb) =>
		task.environment(cb, CFG.ENV_NAME_DEV, PATH_DEV + CFG.FOLDER_CONFIG),
	environment_test: (cb) =>
		task.environment(cb, CFG.ENV_NAME_TEST, PATH_TEST + CFG.FOLDER_CONFIG),
	environment_prod: (cb) =>
		task.environment(cb, CFG.ENV_NAME_PROD, PATH_PROD + CFG.FOLDER_CONFIG),
};

const Common = {
	php_dev: () => task.commonPhp(PATH_DEV),
	php_test: () => task.commonPhp(PATH_TEST),
	php_prod: () => task.commonPhp(PATH_PROD),
	html_dev: function () {
		progress.increment();
		return src([PATH_SRC + '**/*.html']).pipe(dest(PATH_DEV));
	},
	html_test: function () {
		progress.increment();
		return src([PATH_SRC + '**/*.html'])
			.pipe(gulpHtmlMin(options.Html.htmlMin))
			.pipe(dest(PATH_TEST));
	},
	html_prod: function () {
		progress.increment();
		return src([PATH_SRC + '**/*.html'])
			.pipe(gulpHtmlMin(options.Html.htmlMin))
			.pipe(dest(PATH_PROD));
	},
	json_dev: function () {
		progress.increment();
		return src([
			`${PATH_SRC}**/*.json`,
			`!${PATH_SRC}**/scripts/**/*.json`,
		]).pipe(dest(PATH_DEV));
	},
	json_test: function () {
		progress.increment();
		return src([`${PATH_SRC}**/*.json`, `!${PATH_SRC}**/scripts/**/*.json`])
			.pipe(gulpJsonMinify({}))
			.pipe(dest(PATH_TEST));
	},
	json_prod: function () {
		progress.increment();
		return src([`${PATH_SRC}**/*.json`, `!${PATH_SRC}**/scripts/**/*.json`])
			.pipe(gulpJsonMinify({}))
			.pipe(dest(PATH_PROD));
	},
	images_dev: function (cb) {
		progress.increment();
		src(PATH_SRC + CFG.FOLDER_STYLES_IMAGES + '**/*').pipe(
			dest(PATH_DEV + CFG.FOLDER_STYLES_IMAGES),
		);
		src(PATH_SRC + CFG.FOLDER_STATIC_IMAGES + '**/*').pipe(
			dest(PATH_DEV + CFG.FOLDER_STATIC_IMAGES),
		);
		cb();
	},
	images_test: function (cb) {
		progress.increment();
		src(PATH_SRC + CFG.FOLDER_STYLES_IMAGES + '**/*')
			.pipe(gulpImageMin({}))
			.pipe(dest(PATH_TEST + CFG.FOLDER_STYLES_IMAGES));
		src(PATH_SRC + CFG.FOLDER_STATIC_IMAGES + '**/*')
			.pipe(gulpImageMin({}))
			.pipe(dest(PATH_TEST + CFG.FOLDER_STATIC_IMAGES));
		cb();
	},
	images_prod: function (cb) {
		progress.increment();
		src(PATH_SRC + CFG.FOLDER_STYLES_IMAGES + '**/*')
			.pipe(gulpImageMin({}))
			.pipe(dest(PATH_PROD + CFG.FOLDER_STYLES_IMAGES));
		src(PATH_SRC + CFG.FOLDER_STATIC_IMAGES + '**/*')
			.pipe(gulpImageMin({}))
			.pipe(dest(PATH_PROD + CFG.FOLDER_STATIC_IMAGES));
		cb();
	},
	static_dev: () => task.commonStatic(PATH_DEV + CFG.FOLDER_STATIC),
	static_test: () => task.commonStatic(PATH_TEST + CFG.FOLDER_STATIC),
	static_prod: () => task.commonStatic(PATH_PROD + CFG.FOLDER_STATIC),
	fonts_dev: () => task.commonFonts(PATH_DEV),
	fonts_test: () => task.commonFonts(PATH_TEST),
	fonts_prod: () => task.commonFonts(PATH_PROD),
};

const Scripts = {
	scriptsAdmin_dev: () =>
		task.scriptsAdmin(
			CFG.ENV_NAME_DEV,
			PATH_DEV + CFG.FOLDER_ADMIN + CFG.FOLDER_SCRIPTS,
		),
	scriptsWeb_dev: () =>
		task.scriptsWeb(
			CFG.ENV_NAME_DEV,
			PATH_DEV + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS,
		),
	scriptsAdmin_test: () =>
		task.scriptsAdminBuild(
			CFG.ENV_NAME_PROD,
			PATH_TEST + CFG.FOLDER_ADMIN + CFG.FOLDER_SCRIPTS,
		),
	scriptsWeb_test: () =>
		task.scriptsWebBuild(
			CFG.ENV_NAME_PROD,
			PATH_TEST + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS,
		),
	scriptsAdmin_prod: () =>
		task.scriptsAdminBuild(
			CFG.ENV_NAME_PROD,
			PATH_PROD + CFG.FOLDER_ADMIN + CFG.FOLDER_SCRIPTS,
		),
	scriptsWeb_prod: () =>
		task.scriptsWebBuild(
			CFG.ENV_NAME_PROD,
			PATH_PROD + CFG.FOLDER_WEB + CFG.FOLDER_SCRIPTS,
		),
};

const Styles = {
	stylesAdmin_dev: () =>
		task.stylesAdmin(PATH_DEV + CFG.FOLDER_ADMIN + CFG.FOLDER_STYLES_OUTPUT),
	stylesWeb_dev: () =>
		task.stylesWeb(PATH_DEV + CFG.FOLDER_WEB + CFG.FOLDER_STYLES_OUTPUT),
	stylesAdmin_test: () =>
		task.stylesAdminBuild(
			PATH_TEST + CFG.FOLDER_ADMIN + CFG.FOLDER_STYLES_OUTPUT,
		),
	stylesWeb_test: () =>
		task.stylesWebBuild(PATH_TEST + CFG.FOLDER_WEB + CFG.FOLDER_STYLES_OUTPUT),
	stylesAdmin_prod: () =>
		task.stylesAdminBuild(
			PATH_PROD + CFG.FOLDER_ADMIN + CFG.FOLDER_STYLES_OUTPUT,
		),
	stylesWeb_prod: () =>
		task.stylesWebBuild(PATH_PROD + CFG.FOLDER_WEB + CFG.FOLDER_STYLES_OUTPUT),
};

const TaskWatch = {
	admin: function (cb) {
		watch(watchSource.html, options.Watch.watch, Common.html_dev);
		watch(watchSource.json, options.Watch.watch, Common.json_dev);
		watch(watchSource.images, options.Watch.watch, Common.images_dev);
		watch(watchSource.php, options.Watch.watch, Common.php_dev);
		watch(watchSource.fonts.admin, options.Watch.watch, Common.fonts_dev);
		watch(watchSource.static, options.Watch.watch, Common.static_dev);
		watch(
			watchSource.scripts.admin,
			options.Watch.watch,
			Scripts.scriptsAdmin_dev,
		);
		if (CFG.ADMIN_EXTERNAL_CSS)
			watch(
				watchSource.styles.admin,
				options.Watch.watch,
				Styles.stylesAdmin_dev,
			);

		cb(
			console.log(
				'#' +
					` Watching changes in 'admin/' and backend files. You should reload browser manually. `
						.yellow,
			),
		);
	},
	web: function (cb) {
		watch(watchSource.html, options.Watch.watch, Common.html_dev);
		watch(watchSource.json, options.Watch.watch, Common.json_dev);
		watch(watchSource.images, options.Watch.watch, Common.images_dev);
		watch(watchSource.fonts.web, options.Watch.watch, Common.fonts_dev);
		watch(watchSource.scripts.web, options.Watch.watch, Scripts.scriptsWeb_dev);
		watch(watchSource.styles.web, options.Watch.watch, Styles.stylesWeb_dev);

		cb(
			console.log(
				'#' +
					` Watching changes in 'web/' files. You should reload browser manually. `
						.yellow,
			),
		);
	},
	all: function (cb) {
		watch(watchSource.html, options.Watch.watch, Common.html_dev);
		watch(watchSource.json, options.Watch.watch, Common.json_dev);
		watch(watchSource.images, options.Watch.watch, Common.images_dev);
		watch(watchSource.php, options.Watch.watch, Common.php_dev);
		watch(
			[...watchSource.fonts.admin, ...watchSource.fonts.web],
			options.Watch.watch,
			Common.fonts_dev,
		);
		watch(watchSource.static, options.Watch.watch, Common.static_dev);
		watch(
			watchSource.scripts.admin,
			options.Watch.watch,
			Scripts.scriptsAdmin_dev,
		);
		watch(watchSource.scripts.web, options.Watch.watch, Scripts.scriptsWeb_dev);
		if (CFG.ADMIN_EXTERNAL_CSS)
			watch(
				watchSource.styles.admin,
				options.Watch.watch,
				Styles.stylesAdmin_dev,
			);
		watch(watchSource.styles.web, options.Watch.watch, Styles.stylesWeb_dev);
		cb(
			console.log(
				'#' +
					` Watching changes in whole project structure. You should reload browser manually. `
						.yellow,
			),
		);
	},
};

const TaskDev = series(
	Clean.clean_dev,
	parallel(
		Common.php_dev,
		Common.html_dev,
		Common.json_dev,
		Common.images_dev,
		Common.static_dev,
		Common.fonts_dev,
		Scripts.scriptsAdmin_dev,
		Scripts.scriptsWeb_dev,
		Styles.stylesAdmin_dev,
		Styles.stylesWeb_dev,
	),
	Environment.environment_dev,
);

const TaskTest = series(
	Clean.clean_test,
	parallel(
		Common.php_test,
		Common.html_test,
		Common.json_test,
		Common.images_test,
		Common.static_test,
		Common.fonts_test,
		Scripts.scriptsAdmin_test,
		Scripts.scriptsWeb_test,
		Styles.stylesAdmin_test,
		Styles.stylesWeb_test,
	),
	Environment.environment_test,
);

const TaskBuild = series(
	Clean.clean_prod,
	parallel(
		Common.php_prod,
		Common.html_prod,
		Common.json_prod,
		Common.images_prod,
		Common.static_prod,
		Common.fonts_prod,
		Scripts.scriptsAdmin_prod,
		Scripts.scriptsWeb_prod,
		Styles.stylesAdmin_prod,
		Styles.stylesWeb_prod,
	),
	Environment.environment_prod,
);

export const dev = series(TaskDev);
export const start = series(TaskDev, TaskWatch.all);
export const start_admin = series(TaskDev, TaskWatch.admin);
export const start_web = series(TaskDev, TaskWatch.web);
export const test = series(TaskTest);
export const build = series(TaskBuild);

export default dev;
