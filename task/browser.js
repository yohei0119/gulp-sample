const {src, dest} = require('gulp'); 
const browsersync = require('browser-sync').create();

// サーバー立ち上げ
const buildServer = () => {
  browsersync.init({
    server: {
      baseDir: './dist/',
      index  : 'index.html' 
    }
  });
  console.log('Server was launched');
};

// ブラウザのリロード
const browserReload = (cb) => {
  browsersync.reload();
  cb();
  console.log('Browser reload completed');
};

module.exports = {
  buildServer: buildServer,
  browserReload: browserReload
};