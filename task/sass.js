const { src, dest, watch, series } = require('gulp'); // gulp
const sass = require('gulp-sass');                    // sass
const autoprefixer = require('gulp-autoprefixer');    // autoprefixer
const sourcemaps = require('gulp-sourcemaps');        // sourcemap
const gulpif = require('gulp-if');                    // mode分岐用
const ifElse = require('gulp-if-else');               // mode分岐用
const { mode } = require('./mode');                   // mode

const path = {
  src: './src/scss/style.scss', // 入力フォルダ
  dest: './docs/css',           // 出力フォルダ
}

// cssの出力形式を分岐
const type = ifElse(
  mode,
  () => { return 'compressed' }, // production 圧縮
  () => { return 'expanded' }    // development 非圧縮
);

const buildSass = (cb) => {
  src(path.src)
    .pipe(gulpif(!mode, sourcemaps.init()))
    .pipe(sass({
      outputStyle: type
    }))
    .pipe(autoprefixer({
      cascade: false // ベンダープレフィックスの付与
    }))
    .pipe(gulpif(!mode, sourcemaps.write('./'))) // ソースマップはcssフォルダに出力
    .pipe(dest(path.dest));
  cb();
}

// 監視
const watchSass = () => watch(path.src, series(buildSass));

module.exports = {
  buildSass: buildSass,
  watchSass: watchSass,
};