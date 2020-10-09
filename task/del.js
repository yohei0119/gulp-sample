const rimraf = require('rimraf');

// ソースマップを削除
const delSourcemap = (cb) => {
  rimraf('./dist/**/*.map', cb);
}

module.exports = {
  delSourcemap: delSourcemap
};