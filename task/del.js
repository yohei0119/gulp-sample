const rimraf = require('rimraf');

// ソースマップを削除
const delSourcemap = (cb) => {
  rimraf('./docs/**/*.map', cb);
}

module.exports = {
  delSourcemap: delSourcemap
};