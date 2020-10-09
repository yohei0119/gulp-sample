const { src, dest, watch, series } = require('gulp'); // gulp
const plumber = require('gulp-plumber')               // plumber
const babel = require('gulp-babel');                  // babel 
const sourcemaps = require('gulp-sourcemaps');        // sourcemap
const gulpif = require('gulp-if');                    // mode分岐用
const { mode } = require('./mode');                   // mode
const rename = require("gulp-rename");                // rename js圧縮用
const uglify = require("gulp-uglify");                // uglify js圧縮用
const { browserReload } = require('./browser');       // browser-sync

const path = {
  es6: './src/js/**/*.js',       // 入力フォルダ
  es6Inc: '!./src/js/**/_*.js',  // 出力除外ファイル
  js: './docs/js',               // 出力フォルダ
}

const buildJs = (cb) => {
  src([path.es6, path.es6Inc])  
    .pipe(gulpif(!mode, sourcemaps.init()))
    .pipe(plumber())  
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulpif(mode, uglify({
      mangle: true,         // 難読化
      compress: true,       // 圧縮
    })))
    /* renameはとりあえずしないので非活性
    .pipe(gulpif(mode, rename({
      extname: '.min.js'
    })))
    */
    .pipe(gulpif(!mode, sourcemaps.write('./'))) // ソースマップはcssフォルダに出力    
    .pipe(dest(path.js));
  cb();
}

// 監視
const watchJs = () => watch(path.es6, series(buildJs, browserReload));

module.exports = {
  buildJs: buildJs,
  watchJs: watchJs
};