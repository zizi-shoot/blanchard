/* eslint-disable arrow-body-style */

const {
	src,
	dest,
	parallel,
	series,
	watch,
} = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const fileInclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const webpackStream = require('webpack-stream');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revdel = require('gulp-rev-delete-original');
const htmlmin = require('gulp-htmlmin');
const flatten = require('gulp-flatten');

// DEV TASKS

const clean = () => {
	return del(['app/*']);
};
const htmlInclude = () => {
	return src(['src/index.html'])
		.pipe(fileInclude({
			prefix: '@',
			basePath: '@file',
		}))
		.pipe(dest('app'))
		.pipe(browserSync.stream());
};
const scripts = () => {
	return src('src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			devtool: 'source-map',
			output: {
				filename: 'main.min.js',
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})
		.pipe(dest('app/js'))
		.pipe(browserSync.stream());
};
const fonts = () => {
	return src('src/fonts/**.woff2')
		.pipe(dest('app/fonts/'));
};
const imgToApp = () => {
	return src(['src/img/*.ico', 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.png'])
		.pipe(flatten())
		.pipe(dest('app/img'));
};
const svgSprites = () => {
	return src(['src/**/*.svg'])
		.pipe(flatten())
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg',
				},
			},
		}))
		.pipe(dest('app/img/'));
};
const styles = () => {
	return src('src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
		})
			.on('error', notify.onError()))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('app/css/'))
		.pipe(browserSync.stream());
};
const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: 'app',
		},
		browser: 'google chrome',
	});
	watch('src/**/*.scss', styles);
	watch('src/**/*.html', htmlInclude);
	watch('src/**/**.jpg', imgToApp);
	watch('src/**/*.jpeg', imgToApp);
	watch('src/components/**/*.png', imgToApp);
	watch('src/**/*.svg', svgSprites);
	watch('src/fonts/**.ttf', fonts);
	watch('src/**/*.js', scripts);
};

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, imgToApp, svgSprites), styles, watchFiles);

// BUILD TASKS
const stylesBuild = () => {
	return src('src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed',
		})
			.on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2,
		}))
		.pipe(dest('app/css/'));
};
const scriptsBuild = () => {
	return src('src/js/main.js')
		.pipe(webpackStream({
			mode: 'production',
			output: {
				filename: 'main.min.js',
			},
		}))
		.on('error', function(err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})
		.pipe(dest('app/js'));
};
const cache = () => {
	return src('app/**/*.{css,js,svg,png,jpg,jpeg,woff2}', { base: 'app' })
		.pipe(rev())
		.pipe(revdel())
		.pipe(dest('app'))
		.pipe(rev.manifest('rev.json'))
		.pipe(dest('app'));
};
const rewrite = () => {
	const manifest = src('app/rev.json');
	return src('app/**/*.html')
		.pipe(revRewrite({
			manifest,
		}))
		.pipe(dest('app'));
};
const htmlMinify = () => {
	return src('app/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
		}))
		.pipe(dest('app'));
};

exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, imgToApp, svgSprites), stylesBuild, htmlMinify);
exports.cache = series(cache, rewrite);
