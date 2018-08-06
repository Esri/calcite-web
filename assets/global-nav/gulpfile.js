const gulp = require('gulp');

require('require-dir')('./gulp-tasks');

gulp.task('default', ["clean-dist", "watch-es-lint", "watch-js", "watch-postcss", "watch-optimize-images", "watch-static-files", "web-server"], () => {});
gulp.task('build', ["clean-dist", "compile-js", "compile-postcss", "optimize-images", "copy-static-files"], () => {});
