const { src, dest, watch, series } = require('gulp'); // gulp
const plumber = require('gulp-plumber')               // plumber
const stylus = require('gulp-stylus');                // stylus
const autoprefixer = require('gulp-autoprefixer');    // autoprefixer
const stylint = require('gulp-stylint');              // stylint
const sourcemaps = require('gulp-sourcemaps');        // sourcemap
const gulpif = require('gulp-if');                    // mode分岐用
const { mode } = require('./mode');                   // mode
const { browserReload } = require('./browser');       // browser-sync

const path = {
  styl: './src/stylus/**/*.styl',       // 入力ファイル
  stylInc: '!./src/stylus/**/_*.styl',  // 出力除外ファイル
  css: './dist/css',                    // 出力フォルダ
}

const buildStylus = (cb) => {
  src([path.styl, path.stylInc])
    .pipe(gulpif(!mode, sourcemaps.init()))
    .pipe(plumber())
    .pipe(stylint({config: '.stylintrc'}))
    .pipe(stylint.reporter())
    .pipe(stylus({
      compress: mode
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulpif(!mode, sourcemaps.write('./'))) // ソースマップはcssフォルダに出力
    .pipe(dest(path.css));
  cb();
}

// 監視
const watchStylus = () => watch(path.styl, series(buildStylus, browserReload));

module.exports = {
  buildStylus: buildStylus,
  watchStylus: watchStylus
};