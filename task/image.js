const { src, dest, watch, series } = require('gulp'); // gulp
const imagemin = require('gulp-imagemin');            // imagemin
const { browserReload } = require('./browser');       // browser-sync

const path = {
  images: './src/image/*', // 入力フォルダ
  image: './docs/image',   // 出力フォルダ
}

const buildImage = (cb) => {
  src(path.images)    
    .pipe(imagemin({
      optimizationLevel: 7
    }))
    .pipe(dest(path.image));
  cb();
}

// 監視
// imageは監視すると重くなるので非活性
// const watchImage = () => watch(path.es6, series(buildImage, browserReload));

module.exports = {
  buildImage: buildImage,
  // watchImage: watchImage
};