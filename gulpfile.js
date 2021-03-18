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
const gulpif = require('gulp-if');
const { readFileSync } = require('fs');
const replace = require('gulp-replace');

let isProd = false;
let buildDest = 'app';
const toProd = (done) => {
  isProd = true;
  buildDest = 'build';
  done();
};

// DEV TASKS

const clean = () => {
  return del([`${buildDest}/*`]);
};
const htmlInclude = () => {
  return src(['src/index.html'])
    .pipe(fileInclude({
      prefix: '@',
      basePath: '@file',
    }))
    .pipe(dest(buildDest))
    .pipe((gulpif(!isProd, browserSync.stream())));
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
    .on('error', (err) => {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest(`${buildDest}/js`))
    .pipe((gulpif(!isProd, browserSync.stream())));
};
const fonts = () => {
  return src('src/fonts/**.woff2')
    .pipe(dest(`${buildDest}/fonts`));
};
const imgToApp = () => {
  return src(['src/img/*.ico', 'src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.png'])
    .pipe(flatten())
    .pipe(dest(`${buildDest}/img`));
};
const svgSprites = () => {
  return src(['src/img/**/*.svg', 'src/components/**/*.svg'])
    .pipe(flatten())
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
        },
      },
    }))
    .pipe(dest(`${buildDest}/img`));
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
  watch('src/img/**/*.svg', svgSprites);
  watch('src/components/**/*.svg', svgSprites);
  watch('src/fonts/**.ttf', fonts);
  watch('src/**/*.js', scripts);
};

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, imgToApp, svgSprites), styles, watchFiles);

// BUILD TASKS
const imgToBuild = () => {
  return src('src/compressed_img/*')
    .pipe(dest('build/img'));
};
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
    .pipe(dest('build/css/'));
};
const scriptsBuild = () => {
  return src('src/js/main.js')
    .pipe(webpackStream({
      mode: 'production',
      output: {
        filename: 'main.min.js',
      },
    }))
    .on('error', (err) => {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest('build/js'));
};
const renameImg = () => {
  src('build/css/*.css')
    .pipe(replace(/.jpg|.png/g, '.webp'))
    .pipe(dest('build/css'));
  src('build/js/*.js')
    .pipe(replace(/.jpg|.png/g, '.webp'))
    .pipe(dest('build/js'));
  return src('build/*.html')
    .pipe(replace(/.jpg|.png/g, '.webp'))
    .pipe(dest('build'));
};
const cache = () => {
  return src('build/**/*.{css,js,svg,webp,woff2}', { base: 'build' })
    .pipe(rev())
    .pipe(revdel())
    .pipe(dest('build'))
    .pipe(rev.manifest('rev.json'))
    .pipe(dest('build'));
};
const rewrite = () => {
  const manifest = readFileSync('build/rev.json');

  src('build/js/*.js')
    .pipe(revRewrite({
      manifest,
    }))
    .pipe(dest('build/js'));
  src('build/css/*.css')
    .pipe(revRewrite({
      manifest,
    }))
    .pipe(dest('build/css'));

  return src('build/*.html')
    .pipe(revRewrite({
      manifest,
    }))
    .pipe(dest('build'));
};
const htmlMinify = () => {
  return src('build/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(dest('build'));
};

exports.build = series(toProd, clean, parallel(htmlInclude, scriptsBuild, fonts, imgToBuild), stylesBuild, renameImg, htmlMinify);
exports.cache = series(cache, rewrite);
