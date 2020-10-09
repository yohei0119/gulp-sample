const { src, dest, watch, series } = require('gulp'); // gulp
const plumber = require('gulp-plumber')               // plumber
const pug = require('gulp-pug');                      // pug
const { mode } = require('./mode');                   // mode
const { browserReload } = require('./browser');       // browser-sync

const path = {
  pug: './src/pug/**/*.pug',       // 入力ファイル
  pugInc: '!./src/pug/**/_*.pug',  // 出力除外ファイル
  html: './docs/',                 // 出力フォルダ
}

const buildPug = (cb) => {
  src([path.pug, path.pugInc])
    .pipe(plumber())   
    .pipe(pug({
      pretty: true // これが無いと圧縮される 圧縮してよければmodeにしておく
    }))
    .pipe(dest(path.html));
  cb();
}

// 監視
const watchPug = () => watch(path.pug, series(buildPug, browserReload));

module.exports = {
  buildPug: buildPug,
  watchPug: watchPug
};