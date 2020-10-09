const { series, parallel } = require('gulp');
const { buildPug, watchPug } = require('./task/pug');          // pug
const { buildStylus, watchStylus } = require('./task/stylus'); // stylus
const { buildJs, watchJs } = require('./task/babel');          // js
const { buildImage } = require('./task/image');                // image
const { buildServer, browserReload } = require('./task/browser');  // browser-sync
const { delSourcemap } = require('./task/del');                // Sourcemap削除 

exports.prod = series(
  delSourcemap,
  buildStylus,
  buildPug,
  buildJs,
  buildImage,
  buildServer,
  browserReload
);

exports.dev = parallel(
  buildStylus,
  buildPug,
  buildJs,
  buildImage,
  buildServer,
  browserReload,
  watchStylus,
  watchPug,
  watchJs
);
