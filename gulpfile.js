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
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const del = require('del');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const tiny = require('gulp-tinypng-compress');
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
				filename: 'main.js',
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
	src('src/fonts/**.woff2')
		.pipe(dest('app/fonts/'));
	return src('src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('app/fonts/'));
};
const checkWeight = (fontname) => {
	let weight = null;
	switch (true) {
	case /Thin/.test(fontname):
		weight = 100;
		break;
	case /ExtraLight/.test(fontname):
		weight = 200;
		break;
	case /Light/.test(fontname):
		weight = 300;
		break;
	case /Regular/.test(fontname):
		weight = 400;
		break;
	case /Medium/.test(fontname):
		weight = 500;
		break;
	case /SemiBold/.test(fontname):
		weight = 600;
		break;
	case /Semi/.test(fontname):
		weight = 600;
		break;
	case /Bold/.test(fontname):
		weight = 700;
		break;
	case /ExtraBold/.test(fontname):
		weight = 800;
		break;
	case /Heavy/.test(fontname):
		weight = 700;
		break;
	case /Black/.test(fontname):
		weight = 900;
		break;
	default:
		weight = 400;
	}
	return weight;
};
const cb = () => {
};
const srcFonts = 'src/scss/_fonts.scss';
const appFonts = 'app/fonts/';
const fontsStyle = (done) => {
	const file_content = fs.readFileSync(srcFonts);
	fs.writeFile(srcFonts, '', cb);
	fs.readdir(appFonts, (err, items) => {
		if (items) {
			let c_fontname;
			for (let i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				const font = fontname.split('-')[0];
				const weight = checkWeight(fontname);
				if (c_fontname !== fontname) {
					fs.appendFile(srcFonts, `@include font-face("${font}", "${fontname}", ${weight});\r\n`, cb);
				}
				c_fontname = fontname;
			}
		}
	});
	done();
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
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2,
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
	watch('src/index.html', htmlInclude);
	watch('src/**/*.html', htmlInclude);
	watch('src/**/**.jpg', imgToApp);
	watch('src/**/*.jpeg', imgToApp);
	watch('src/components/**/*.png', imgToApp);
	watch('src/**/*.svg', svgSprites);
	watch('src/fonts/**.ttf', fonts);
	watch('src/fonts/**.ttf', fontsStyle);
	watch('src/**/*.js', scripts);
};
exports.styles = styles;
exports.watchFiles = watchFiles;
exports.htmlInclude = htmlInclude;
exports.default = series(clean, parallel(htmlInclude, scripts, fonts, imgToApp, svgSprites), fontsStyle, styles, watchFiles);
// MINIFIED BUILD TASKS
const scriptsBuild = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream(
			{
				mode: 'development',
				output: {
					filename: 'main.js',
				},
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: [
										['@babel/preset-env', { targets: 'defaults' }],
									],
								},
							},
						},
					],
				},
			},
		))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})
		.pipe(uglify()
			.on('error', notify.onError()))
		.pipe(dest('app/js'));
};
const stylesBuild = () => {
	return src('src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded',
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
const tinypng = () => {
	return src(['src/img/**.JPG', 'src/img/**.jpg', 'src/img/**.jpeg', 'src/img/**.png'])
		.pipe(tiny({
			key: 'nqwXPGKFGgvLwjVrtPGfh7VQzMzT643G',
			parallel: true,
			parallelMax: 50,
			log: true,
		}))
		.pipe(dest('app/img'));
};
exports.cache = series(cache, rewrite);
exports.build = series(clean, parallel(htmlInclude, scriptsBuild, fonts, imgToApp, svgSprites), fontsStyle, stylesBuild, htmlMinify, tinypng);
// FULL BUILD TASKS (build without minification for check)
const fullClean = () => {
	return del(['full_build/*']);
};
const fullStyles = () => {
	return src('src/scss/**/*.scss')
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
		.pipe(dest('full_build/css/'));
};
const fullScripts = () => {
	return src('src/js/main.js')
		.pipe(webpackStream({
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [
									['@babel/preset-env', {targets: 'defaults'}],
								],
							},
						},
					},
				],
			},
		}))
		.on('error', function(err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})
		.pipe(dest('full_build/js'));
};
const fullHtmlInclude = () => {
	return src(['src/index.html'])
		.pipe(fileInclude({
			prefix: '@',
			basePath: '@file',
		}))
		.pipe(dest('full_build'));
};
const fullFonts = () => {
	src('src/fonts/**.woff2')
		.pipe(dest('full_build/fonts/'));
	return src('src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('full_build/fonts/'));
};
const fullImgToApp = () => {
	return src(['img/*.ico', 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.png'])
		.pipe(flatten())
		.pipe(dest('full_build/img'));
};
const fullSvgSprites = () => {
	return src(['src/**/*.svg'])
		.pipe(flatten())
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg',
				},
			},
		}))
		.pipe(dest('full_build/img/'));
};
const fullAppFonts = 'full_build/fonts/';
const fullFontsStyle = (done) => {
	const file_content = fs.readFileSync(srcFonts);
	fs.writeFile(srcFonts, '', cb);
	fs.readdir(fullAppFonts, (err, items) => {
		if (items) {
			let c_fontname;
			for (let i = 0; i < items.length; i++) {
				let fontname = items[i].split('.');
				fontname = fontname[0];
				const font = fontname.split('-')[0];
				const weight = checkWeight(fontname);
				if (c_fontname !== fontname) {
					fs.appendFile(srcFonts, `@include font-face("${font}", "${fontname}", ${weight});\r\n`, cb);
				}
				c_fontname = fontname;
			}
		}
	});
	done();
};
exports.fullBuild = series(fullClean, parallel(fullHtmlInclude, fullScripts, fullFonts, fullImgToApp, fullSvgSprites), fullFontsStyle, fullStyles);
