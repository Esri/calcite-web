const gulp = require('gulp');
const watch = require('gulp-watch');
const eslint = require('gulp-eslint');
const logger = require('gulp-logger');

const pkg = require('../package.json');

function lintJs(sourceFiles) {
    return gulp.src(sourceFiles)
        .pipe(logger({
            before: 'Starting lintJs...',
            after: 'lintJs complete!',
            showChange: false
        }))
        .pipe(eslint({
	        useEslintrc : true,
	        configFile : './.eslintrc'
        }))
	    .pipe(eslint.format());
}

gulp.task('es-lint', () => {
    lintJs(`${pkg.gulp_config.src_path}/**/*.js`);
});

gulp.task('watch-es-lint', () => {
    console.log('watching es-lint...');
	lintJs(`${pkg.gulp_config.src_path}/**/*.js`);
    watch(`${pkg.gulp_config.src_path}/**/*.js`, (modFile) => {
        lintJs([modFile.path]);
    });
});
